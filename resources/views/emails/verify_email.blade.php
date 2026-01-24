<h1>Welcome to BookingApp!</h1>
<p>Please confirm your email address by clicking on the link below.</p>
<a href="{{ url('verify-email/' . $token->token) }}">Confirm email</a>