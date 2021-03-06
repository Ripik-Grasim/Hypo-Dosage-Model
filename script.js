var Target_hypo_Input = 0
var Target_hypo = 450;
var target_loose_pulp_viscosity = 450;
var eop_prev1 = 0;
var eop_prev2 = 0;
var hypo_visc_prev1 = 0;
var hypo_visc_prev2 = 0;
var hypo_add_prev1 = 0;
var eop_current = 0;
var hypo_addition = 0;
var bias_term = 0
function showInfo() {
	eop_prev2 = document.getElementById('eopViscosity2').value;
	eop_prev1 = document.getElementById('eopViscosity1').value;
	hypo_visc_prev2 = document.getElementById('hypoViscosity2').value;
	hypo_visc_prev1 = document.getElementById('hypoViscosity1').value;
	hypo_add_prev1 = document.getElementById('hypoAddition1').value;

	Target_hypo_Input = document.getElementById('prevTargetHypo').value;
	target_loose_pulp_viscosity = document.getElementById('targetLoosePulpViscosity').value; //450 by default
	var sum = hypo_visc_prev1*1 + 1*hypo_visc_prev2;
	var diff = sum -1000;
	var final = 0.05*diff;
	bias_term = final;
	if (eop_prev1 < 560){
		hypo_addition = (-4.216047661) - (0.113834977*eop_prev2) + (0.127907925*eop_prev1) + (0.776974139*hypo_add_prev1) + (bias_term);
	}
	else if (eop_prev1 > 626){
		hypo_addition = (-22.70931995) - (0.169091429*eop_prev2) + (0.209982459*eop_prev1) + (0.914237136*hypo_add_prev1) + (bias_term);
	}
	else{
		hypo_addition = (-16.99183972) - (0.161202157*eop_prev2) + (0.196158891*eop_prev1) + (0.846441217*hypo_add_prev1) + (bias_term);
	}

	var str = "";

	str += "<h2>Target Loose Pulp Viscosity = " + target_loose_pulp_viscosity + "<br></h2>";
	if (hypo_addition < 0.0){
	  str += "<h2>Recommended Hypo Dosage Value less than zero<br></h2>";
	}
	else{
	  str += "<h2>Recommended Hypo Dosage: "+ hypo_addition.toFixed(3) +" L/min<br></h2>";
	}

	Target_hypo = Target_hypo_Input;
	document.getElementById('info').innerHTML = str;
	document.getElementById('inputInfo').style.display = "none";
	document.getElementById('outputInfo').style.display = "block";
	var data = {
		Target_hypo_Input: Target_hypo_Input,
		Target_hypo:Target_hypo,
		target_loose_pulp_viscosity: target_loose_pulp_viscosity,
		hypo_addition:hypo_addition,
	};
	console.log(data)
	postData('https://checkproject2-337711.el.r.appspot.com/main/dosage/all', data).then(() => console.log("OK"));
}

async function postData(url, data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
		'Content-Type': 'application/json'
		// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response; // parses JSON response into native JavaScript objects
  }
  

function resetForm() {
	document.getElementById('inputInfo').style.display = "block";
	document.getElementById('outputInfo').style.display = "none";

	document.getElementById("inputForm").reset();
	document.getElementById('prevTargetHypo').value = 500;
	document.getElementById('targetLoosePulpViscosity').value = 450;
}

document.getElementById('outputInfo').style.display = "none";
