<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #5227FF, #7C3AED);
            color: white;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            text-align: center;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
            border: 1px solid #e0e0e0;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-label {
            font-weight: bold;
            color: #5227FF;
            display: block;
            margin-bottom: 5px;
        }
        .field-value {
            background: white;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ddd;
        }
        .message-box {
            background: white;
            padding: 15px;
            border-radius: 5px;
            border: 1px solid #ddd;
            white-space: pre-wrap;
            min-height: 100px;
        }
        .footer {
            margin-top: 20px;
            padding: 15px;
            background: #f0f0f0;
            border-radius: 5px;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📧 New Contact Form Submission</h1>
        <p>Someone has sent you a message through your portfolio contact form</p>
    </div>
    
    <div class="content">
        <div class="field">
            <span class="field-label">👤 Name:</span>
            <div class="field-value">{{ $contactName }}</div>
        </div>
        
        <div class="field">
            <span class="field-label">📧 Email:</span>
            <div class="field-value">{{ $contactEmail }}</div>
        </div>
        
        <div class="field">
            <span class="field-label">📝 Subject:</span>
            <div class="field-value">{{ $contactSubject }}</div>
        </div>
        
        <div class="field">
            <span class="field-label">💬 Message:</span>
            <div class="message-box">{{ $contactMessage }}</div>
        </div>
    </div>
    
    <div class="footer">
        <p>This email was sent from your portfolio contact form at {{ config('app.url') }}</p>
        <p>Sent on {{ now()->format('F j, Y \a\t g:i A') }}</p>
    </div>
</body>
</html>