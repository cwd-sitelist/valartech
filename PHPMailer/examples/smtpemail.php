
<?php

//error_reporting(E_ALL);
error_reporting(E_STRICT);


date_default_timezone_set('Asia/Kolkata');

require_once('../class.phpmailer.php');
//include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded

$mail             = new PHPMailer();

$body             = 'Mail From ValarTech';
// $body             = preg_replace('/[\]/','',$body);


$hours = date("H");
$min = date("i");

$defaulttimestamp=time();
$indiatimestamp  = $defaulttimestamp;
  


$FromName=$_POST["name"];
$FromPhone=$_POST["phone"];
$FromEmail=$_POST["email"];
$FromSubject=$_POST["subject"];
$FromMessage=$_POST["message"];


$address = "info@valartech.co.in";


$message = "
<table style='width: 100%; font-family: helvetica' cellpadding='20' cellspacing='1' border='0'>
      <thead style= 'background: #f8b10a !important;
     text-align:left;'>
		<tr style= 'color: #fff; font-family: helvetica;'>
		  <th >Valartech</th><th>Contact Page</th>              
		</tr>
      </thead>
		  
	  <tbody>
		<tr style='color: #222;'>
				  <td>Name</td><td>$FromName</td>
				</tr>
			    <tr>
				  <td>Phone</td><td>$FromPhone</td>
				</tr>
			<tr>
				  <td>Email</td><td>$FromEmail</td>
				</tr>
                	<tr>
				  <td>Subject</td><td>$FromSubject</td>
				</tr>
				<tr>
				  <td>Message</td><td>$FromMessage</td>
				</tr>
       
			  </tbody>
	</table>
";



$to = 'info@valartech.co.in';

$subject = 'Mail From Valartech';

$headers  = "From: " . "info@valartech.co.in" . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

if($FromEmail && $FromName){
mail($to, $subject, $message, $headers);
    echo "Message sent!";
}
else{
  echo "please fill the details";
}


?>
