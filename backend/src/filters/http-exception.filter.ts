export class AllExceptionsFilter {
  catch(exception: unknown, host: any): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = 500;
    let message = 'Internal server error';

    if (exception instanceof Error) {
      // Handle custom errors from our services
      message = exception.message;
      
      // Set appropriate status codes based on error messages
      if (message.includes('not found') || message.includes('Not found')) {
        status = 404;
      } else if (message.includes('authentication') || message.includes('unauthorized')) {
        status = 401;
      } else if (message.includes('validation') || message.includes('required') || message.includes('Invalid')) {
        status = 400;
      } else if (message.includes('already exists') || message.includes('duplicate')) {
        status = 409;
      }
    }

    // Log the error for debugging
    console.error('Exception caught:', {
      url: request.url,
      method: request.method,
      status,
      message,
      stack: exception instanceof Error ? exception.stack : undefined,
    });

    response.status(status).json({
      error: message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
