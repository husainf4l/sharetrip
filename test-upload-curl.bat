@echo off
echo Testing photo upload...

:: Create a simple 1x1 pixel PNG file for testing
powershell -Command "
$bytes = [System.Convert]::FromBase64String('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI/hRNuPgAAAABJRU5ErkJggg==');
[System.IO.File]::WriteAllBytes('test-image.png', $bytes)
"

:: Test the upload endpoint
curl -X POST http://localhost:3333/api/upload -F "file=@test-image.png" -H "Content-Type: multipart/form-data"

:: Clean up
del test-image.png

echo.
echo Upload test complete!
pause