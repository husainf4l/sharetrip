import { Controller, Post, Body, Get, Query, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MailerService } from '../utils/mailer.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService, private mailer: MailerService) { }

  @Post('signup')
  async signup(@Body() body: any) {
    const { user, verificationToken } = await this.auth.signup(body);
    // Send verify email (templated)
    await this.mailer.sendEmailVerification(user.email!, { 
      name: user.name || 'Traveler', 
      token: verificationToken,
      theme: 'getyourguide'
    });
    
    return { 
      success: true,
      message: 'Welcome to ShareTripX! Your journey begins now.',
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        role: user.role
      },
      verificationToken,
      theme: {
        brand: 'ShareTripX',
        style: 'getyourguide',
        primaryColor: '#00AA6C',
        secondaryColor: '#FF6B35',
        logo: 'https://sharetripx.com/logo.png',
        favicon: 'https://sharetripx.com/favicon.ico'
      },
      welcomeContent: {
        headline: 'Discover Amazing Experiences',
        subheadline: 'Join thousands of travelers exploring the world with local experts',
        features: [
          {
            icon: 'globe',
            title: 'Unique Experiences',
            description: 'Access exclusive tours and activities you won\'t find anywhere else'
          },
          {
            icon: 'users',
            title: 'Local Experts',
            description: 'Learn from passionate locals who know their city inside out'
          },
          {
            icon: 'shield',
            title: 'Safe & Secure',
            description: 'Book with confidence with our 24/7 support and flexible cancellation'
          }
        ]
      }
    };
  }

  @Post('signup/traveler')
  async signupTraveler(@Body() body: any) {
    const signupData = { ...body, wantToHost: false };
    const { user, verificationToken } = await this.auth.signup(signupData);
    await this.mailer.sendEmailVerification(user.email!, { 
      name: user.name || 'Traveler', 
      token: verificationToken,
      theme: 'getyourguide'
    });
    
    return { 
      success: true,
      message: 'Welcome to ShareTripX! Your adventure starts here.',
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      },
      verificationToken,
      theme: {
        brand: 'ShareTripX',
        style: 'getyourguide',
        primaryColor: '#00AA6C',
        logo: 'https://sharetripx.com/logo.png'
      },
      nextSteps: [
        {
          step: 1,
          title: 'Verify your email',
          description: 'Check your inbox and click the verification link',
          icon: 'email',
          completed: false
        },
        {
          step: 2,
          title: 'Complete your profile',
          description: 'Add your travel preferences and interests',
          icon: 'user',
          completed: false
        },
        {
          step: 3,
          title: 'Set travel preferences',
          description: 'Tell us about your ideal trips and destinations',
          icon: 'map',
          completed: false
        },
        {
          step: 4,
          title: 'Start exploring tours',
          description: 'Browse amazing experiences and book your first adventure',
          icon: 'search',
          completed: false
        }
      ],
      onboardingProgress: {
        currentStep: 1,
        totalSteps: 4,
        percentage: 25
      }
    };
  }

  @Post('signup/host')
  async signupHost(@Body() body: any) {
    const signupData = { ...body, wantToHost: true };
    const { user, verificationToken } = await this.auth.signup(signupData);
    await this.mailer.sendEmailVerification(user.email!, { 
      name: user.name || 'Host', 
      token: verificationToken,
      theme: 'getyourguide'
    });
    
    return { 
      success: true,
      message: 'Welcome to ShareTripX! Start sharing your passion for travel.',
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      },
      verificationToken,
      theme: {
        brand: 'ShareTripX',
        style: 'getyourguide',
        primaryColor: '#00AA6C',
        logo: 'https://sharetripx.com/logo.png'
      },
      nextSteps: [
        {
          step: 1,
          title: 'Verify your email',
          description: 'Check your inbox and click the verification link',
          icon: 'email',
          completed: false
        },
        {
          step: 2,
          title: 'Complete host application',
          description: 'Tell us about yourself and your expertise',
          icon: 'user-plus',
          completed: false
        },
        {
          step: 3,
          title: 'Verify your phone number',
          description: 'We\'ll send you a verification code via SMS',
          icon: 'phone',
          completed: false
        },
        {
          step: 4,
          title: 'Submit identification documents',
          description: 'Upload your ID and any required certifications',
          icon: 'file-text',
          completed: false
        },
        {
          step: 5,
          title: 'Set up payments',
          description: 'Connect your bank account to receive payments',
          icon: 'credit-card',
          completed: false
        },
        {
          step: 6,
          title: 'Create your first tour',
          description: 'Design and publish your first amazing experience',
          icon: 'plus-circle',
          completed: false
        }
      ],
      onboardingProgress: {
        currentStep: 1,
        totalSteps: 6,
        percentage: 17
      },
      hostBenefits: [
        'Earn money sharing your passion',
        'Build a community of travelers',
        'Flexible scheduling',
        '24/7 support from our team',
        'Marketing and promotion tools',
        'Instant payouts'
      ]
    };
  }

  @Post('verify-email')
  async verifyEmail(@Body('token') token: string) {
    const result = await this.auth.verifyEmail(token);
    if (result.ok) {
      return {
        success: true,
        message: 'Email verified successfully! Welcome to ShareTripX.',
        theme: {
          brand: 'ShareTripX',
          style: 'getyourguide',
          primaryColor: '#00AA6C'
        },
        nextSteps: [
          {
            title: 'Complete your profile',
            description: 'Add more details to personalize your experience',
            action: 'profile'
          },
          {
            title: 'Explore amazing tours',
            description: 'Browse and book incredible experiences',
            action: 'explore'
          }
        ]
      };
    }
    throw new Error('Invalid verification token');
  }

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;
    const result = await this.auth.login(email, password);
    
    return {
      success: true,
      message: `Welcome back${result.user.name ? `, ${result.user.name}` : ''}!`,
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
        emailVerified: result.user.emailVerified
      },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      theme: {
        brand: 'ShareTripX',
        style: 'getyourguide',
        primaryColor: '#00AA6C'
      },
      dashboardUrl: result.user.role === 'HOST' ? '/host/dashboard' : '/explore'
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: any) {
    return {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      emailVerified: req.user.emailVerified,
    };
  }

  @Post('password/request')
  async requestReset(@Body('email') email: string) {
    const res = await this.auth.createPasswordReset(email);
    if (res.token) await this.mailer.sendPasswordReset(email, { token: res.token });
    return { ok: true };
  }

  @Get('theme')
  async getTheme() {
    return {
      brand: 'ShareTripX',
      style: 'getyourguide',
      colors: {
        primary: '#00AA6C',
        secondary: '#FF6B35',
        accent: '#FFD23F',
        background: '#FFFFFF',
        surface: '#F8F9FA',
        text: '#212529',
        textSecondary: '#6C757D',
        border: '#DEE2E6',
        success: '#28A745',
        warning: '#FFC107',
        error: '#DC3545',
        info: '#17A2B8'
      },
      typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem'
        },
        fontWeight: {
          light: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700
        }
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem'
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px'
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      },
      assets: {
        logo: 'https://sharetripx.com/logo.svg',
        favicon: 'https://sharetripx.com/favicon.ico',
        heroImage: 'https://sharetripx.com/hero-image.jpg'
      },
      components: {
        button: {
          primary: {
            backgroundColor: '#00AA6C',
            color: '#FFFFFF',
            borderRadius: '0.5rem',
            padding: '0.75rem 1.5rem',
            fontWeight: 600,
            fontSize: '1rem'
          },
          secondary: {
            backgroundColor: '#FFFFFF',
            color: '#00AA6C',
            border: '2px solid #00AA6C',
            borderRadius: '0.5rem',
            padding: '0.75rem 1.5rem',
            fontWeight: 600,
            fontSize: '1rem'
          }
        },
        input: {
          border: '1px solid #DEE2E6',
          borderRadius: '0.375rem',
          padding: '0.75rem',
          fontSize: '1rem',
          backgroundColor: '#FFFFFF'
        },
        card: {
          backgroundColor: '#FFFFFF',
          border: '1px solid #DEE2E6',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }
      }
    };
  }

  @Post('password/reset')
  async reset(@Body() body: any) {
    return this.auth.resetPassword(body.token, body.password);
  }

  @Post('resend-verify')
  async resendVerify(@Body('email') email: string) {
    const res = await this.auth.createEmailVerification(email);
    if (res.token) await this.mailer.sendEmailVerification(email, { token: res.token });
    return { ok: true };
  }
}
