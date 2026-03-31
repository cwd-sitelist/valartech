<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Debugging: Enable error reporting
    // error_reporting(E_ALL);
    // ini_set('display_errors', 1);
    
    
        if (!isset($_POST['g-recaptcha-response']) || empty($_POST['g-recaptcha-response'])) {
        echo "Please verify captcha.";
        exit;
    }

    $secretKey = "6LcLKXMsAAAAAEuT7QhIS--CBVHuX06oXXl6HiOm"; 
    $captchaResponse = $_POST['g-recaptcha-response'];
    $userIP = $_SERVER['REMOTE_ADDR'];

    $verifyURL = "https://www.google.com/recaptcha/api/siteverify";
    $response = file_get_contents(
        $verifyURL . "?secret=" . $secretKey . "&response=" . $captchaResponse . "&remoteip=" . $userIP
    );
    $responseData = json_decode($response);

    if (!$responseData->success) {
        echo "Captcha verification failed.";
        exit;
    }



    $to = "info@valartech.co.in"; // Replace with your email address
    $subject = "Valar Tech Contact Form ";

    // Collect form inputs
    $name = htmlspecialchars($_POST['name']);
    $number = htmlspecialchars($_POST['number']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
 
   
    // Basic validation
    if (empty($name) || empty($email)) {
        die("All fields are required. Please go back and complete the form.");
    }

    // Build the email body
             $body = "----------------------------------------\n";
         $body = "Valar Tech Contact Forms \n";
         $body = "----------------------------------------\n";
         
    $body = "Name: $name\n";
    
    if (!empty($number)) {
        $body .= "Number: $number\n";
    }
    
    $body .= "Email: $email\n";
    
    $body .= "Subject: $subject\n";
    
    if (!empty($message)) {
        $body .= "Message: $message\n";
    }
     


    if ($hasAttachment) {
        $file_tmp = $_FILES['attachment']['tmp_name'];
        $file_name = $_FILES['attachment']['name'];
        $file_type = mime_content_type($file_tmp);
        $file_size = $_FILES['attachment']['size'];

    
        // Limit file size (e.g., 2MB)
        if ($file_size > 10 * 1024 * 1024) {
            die("File size exceeds 10MB limit.");
        }

        // Read and encode the file content
        $file_content = chunk_split(base64_encode(file_get_contents($file_tmp)));
        $boundary = md5(uniqid(time()));

        // Email headers with attachment
        $headers  = "From: $to\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        // Email body with attachment
        $email_body  = "--$boundary\r\n";
        $email_body .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
        $email_body .= "Content-Transfer-Encoding: 7bit\r\n";
        $email_body .= "\r\n";
        $email_body .= $body . "\r\n";
        $email_body .= "--$boundary\r\n";
        $email_body .= "Content-Type: $file_type; name=\"$file_name\"\r\n";
        $email_body .= "Content-Disposition: attachment; filename=\"$file_name\"\r\n";
        $email_body .= "Content-Transfer-Encoding: base64\r\n";
        $email_body .= "\r\n";
        $email_body .= $file_content . "\r\n";
        $email_body .= "--$boundary--\r\n";
    } else {
        // Email headers without attachment
        $headers = "From: $to\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";

        $email_body = $body;
    }

  
    // Send the email
    if (mail($to, $subject, $email_body, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email. Please check your server configuration.";
    }
}
?>
