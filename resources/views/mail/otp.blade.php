<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your OTP Code</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f6fa;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #1f1f1f;
            border-radius: 12px;
            padding: 30px;
            color: #fff;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        h1 {
            font-size: 24px;
            margin-bottom: 10px;
            color: #fff;
            text-align: center;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            color: #ccc;
        }

        .otp-box {
            margin: 20px 0;
            background: linear-gradient(90deg, #00d2ff, #3a7bd5);
            padding: 15px 0;
            border-radius: 8px;
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 4px;
            color: #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .highlight {
            color: #00d2ff;
            font-weight: bold;
        }

        .footer {
            font-size: 14px;
            color: #888;
            margin-top: 30px;
            text-align: center;
            line-height: 1.4;
        }

        @media (max-width: 480px) {
            .container {
                padding: 20px;
                margin: 20px;
            }
            .otp-box {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Chit Chat 👋</h1>
        <p>
            Thanks for signing up to <span class="highlight">Chit Chat</span>, the place where conversations flow freely and connections grow. 
            To keep your account secure, we’ve generated a One-Time Password (OTP) just for you.
        </p>
        <div class="otp-box">{{ $otp }}</div>
        <p>
            Enter this code in the app to complete your registration. For your security, this code is valid for only <span class="highlight">2 minutes</span>.
        </p>
        <p>
            If you didn’t request this code, you can safely ignore this email. Your account will remain secure.
        </p>
        <div class="footer">
            &copy; {{ date('Y') }} Infinite Souls — powering <span class="highlight">Chit Chat</span> and many more amazing apps.<br>
            Stay connected. Stay secure. Stay social.
        </div>
    </div>
</body>
</html>
