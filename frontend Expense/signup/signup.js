async function signup(e)
{
	try{
		e.preventDefault();
		console.log(e.target.email.value);

		const signupdetails ={
			name: e.target.name.value,
			email: e.target.email.value,
			password: e.target.password.value
		}

		console.log(signupdetails)

		const response =await axios.post('http://localhost:3000/user/signup',signupdetails)

		if(response.status== 201)
		{
			window.location.href ="../Login/login.html"
		}
		else{
			throw new Error ('Failed to login')
		}
	}
	catch(err)
	{
		document.body.innerHTML +='<div style="color:red;" >${err} <div>';
	}
	}
