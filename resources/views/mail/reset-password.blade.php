<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reset Password</title>
</head>
<body>
    <h2>Password Reset Request</h2>
    <p>You requested to reset your password. Click the link below to continue:</p>

    <p>
        <a href="{{ $resetLink }}" style="background: #2563eb; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
            Reset Password
        </a>
    </p>

    <p>If you did not request this, you can safely ignore this email.</p>
</body>
</html>
