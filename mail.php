<?php
// mail.php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 1. RECIPIENT - ENTER YOUR EMAIL HERE
    $to_email = "info@cpil.com.ng"; 

    // 2. Sanitize and Capture Data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"])); // Captured from your form
    $message = trim($_POST["message"]);

    // 3. Email Content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // 4. Email Headers
    $headers = "From: $name <$email>";

    // 5. Send Email
    if (mail($to_email, $subject, $email_content, $headers)) {
        
        // 6. Redirect to your specific Thank You page
        // Ensure this path is correct relative to your public_html root
        header("Location: form_submission.html");
        exit;
        
    } else {
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
    
} else {
    echo "There was a problem with your submission, please try again.";
}
?>