<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. Core Configuration
    $toEmail = "contact@nexoraweb.agency"; 
    
    // Replace with your actual domain to establish a constant From header (prevents spam marking)
    $fromEmail = "noreply@nexoraweb.agency"; 
    
    // Identify which form was submitted
    $formName = isset($_POST['form-name']) ? $_POST['form-name'] : 'Website Form Submission';
    $subject = "New Submission: " . ucwords(str_replace('-', ' ', $formName));
    
    // 2. Build the HubSpot-Style HTML Email Structure
    $htmlContent = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; color: #33475b; padding: 30px 10px; margin: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 8px; border-top: 4px solid #bb86fc; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
            h2 { color: #33475b; font-size: 24px; margin-top: 0; border-bottom: 2px solid #eaf0f6; padding-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 15px; }
            td { padding: 14px 10px; border-bottom: 1px solid #eaf0f6; vertical-align: top; }
            .label { font-weight: 600; width: 35%; color: #516f90; }
            .value { color: #33475b; }
            .footer { margin-top: 40px; font-size: 13px; color: #99acc2; text-align: center; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>" . htmlspecialchars($subject) . "</h2>
            <table>
    ";

    $replyTo = "";

    // 3. Process All Form Fields Dynamically
    foreach ($_POST as $key => $value) {
        // Skip the technical routing field
        if ($key === 'form-name') continue;

        // Handle checkbox arrays (like the services selection in quote.html)
        if (is_array($value)) {
            $value = implode(", ", $value);
        }

        // Clean and format inputs
        $safeKey = ucwords(str_replace(['-', '_'], ' ', htmlspecialchars($key)));
        $safeValue = nl2br(htmlspecialchars(trim($value)));

        // Capture the user's email for the Reply-To header
        if (strtolower($key) === 'email') {
            $replyTo = trim($value);
        }
        
        // Override the default subject if the form has a dedicated subject field
        if (strtolower($key) === 'subject' && !empty($value)) {
            $subject = "Nexora Inquiry: " . trim($value);
        }

        // Append rows to the email table
        if (!empty($safeValue)) {
            $htmlContent .= "
                <tr>
                    <td class='label'>{$safeKey}</td>
                    <td class='value'>{$safeValue}</td>
                </tr>
            ";
        }
    }

    $htmlContent .= "
            </table>
            <div class='footer'>Securely submitted via Nexora Web Agency backend (cPanel).</div>
        </div>
    </body>
    </html>
    ";

    // 4. Construct Anti-Spam Headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Nexora System <" . $fromEmail . ">\r\n";
    
    if (!empty($replyTo) && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: " . $replyTo . "\r\n";
    }

    // 5. Dispatch Email & Trigger Redirects
    mail($toEmail, $subject, $htmlContent, $headers);

    if ($formName === 'quote-request') {
        header("Location: /thank-you.html");
    } else {
        header("Location: /contact-submission.html"); 
    }
    exit();
    
} else {
    // Prevent direct browser access to the PHP file
    header("Location: /index.html");
    exit();
}
?>