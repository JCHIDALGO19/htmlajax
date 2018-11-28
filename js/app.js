var btnActualizar= document.getElementById("btnActualizar");
var btnGuardar= document.getElementById("btnGuardar");

btnActualizar.addEventListener('click', actualizar);
btnGuardar.addEventListener('click', guardar); 

actualizar();
function actualizar()
{
	var xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			var response =JSON.parse(this.responseText);
			if (response.status =="ok") 
			{
				document.getElementsByTagName('tbody')[0].innerHTML="";
				response.students.forEach(function(student)
				{
				  var row = document.createElement("tr");
				  var idCell = document.createElement("td");
				  var firstNameCell = document.createElement("td");
				  var lastNameCell = document.createElement("td");

				  var idText= document.createTextNode(student.id);
				  var firstText= document.createTextNode(student.first_name);
				  var lastText= document.createTextNode(student.last_name);

				  idCell.appendChild(idText);
				  firstNameCell.appendChild(firstText);
				  lastNameCell.appendChild(lastText);

				  row.appendChild(idCell);
				  row.appendChild(firstNameCell);
				  row.appendChild(lastNameCell);

				  document.getElementsByTagName('tbody')[0].appendChild(row);

			  });     
			} 
		}
	};

	xhttp.open("GET", "http://nyc.pixan.io/ajax/public/api/students", true);
	xhttp.send();
}
	function guardar() 
	{

		var first_name =document.getElementById('first_name').value;
		var last_name=document.getElementById('last_name').value;
		var phone_number=document.getElementById('phone_number').value;
		var email=document.getElementById('email').value;

		var data=new FormData();
				data.append('first_name', first_name);
				data.append('last_name', first_name);
				data.append('phone_number', phone_number);
				data.append('email', email);

		var xhttp=new XMLHttpRequest();
		xhttp.onreadystatechange=function()
		{
			if(this.readyState ==4 && this.status == 200)
			{
				var response=JSON.parse(this.responseText);
				if (response.status =="error")
			{
				alert(response.errors[0]);
			}
			else 
			
			{
				actualizar();
				document.getElementById('first_name').value="";
				document.getElementById('last_name').value="";
				document.getElementById('phone_number').value="";
				document.getElementById('email').value="";                                                            	
			}
		}
	};
	xhttp.open("POST", "http://nyc.pixan.io/ajax/public/api/students", true);
	xhttp.send(data);
}