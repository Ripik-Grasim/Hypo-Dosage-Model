var EOP_viscosity = 0;
var Hypo_viscosity = 0;
var Loose_pulp_viscosity = 0;
var Hypo_addition = 0;
var delta2_prev= -69.8
var Target_hypo = 0
var target_loose_pulp_viscosity = 450
	
function showInfo() {
	EOP_viscosity = document.getElementById('eopViscosity').value;
	Hypo_viscosity = document.getElementById('hypoViscosity').value;
	Loose_pulp_viscosity = document.getElementById('loosePulpViscosity').value;
	Hypo_addition = document.getElementById('hypoAddition').value;
	Target_hypo = document.getElementById('prevTargetHypo').value;
	target_loose_pulp_viscosity = document.getElementById('targetLoosePulpViscosity').value; //450 by default

	var delta3 = Loose_pulp_viscosity - Hypo_viscosity
	var delta3_percent = -delta3/Hypo_viscosity
	var target_hypo_viscosity = 450/(1-delta3_percent)
	var bias_percent = (Hypo_viscosity - target_hypo_viscosity)/target_hypo_viscosity
	var delta2 = Hypo_viscosity - EOP_viscosity
	var hypo_solution = (0.508 * delta2_prev - delta2)/0.2939
	if(hypo_solution>40){
		hypo_solution = 40;
	}
	var corrected_hypo_solution = hypo_solution * (1 + bias_percent)

	var str = "";
	// str += "<h2>Hypo Addition = " + Hypo_addition + "<br>";
	str += "<h2>Target Loose Pulp Viscosity = " + target_loose_pulp_viscosity + "<br></h2>";

	str += "<h2>Predicted delta3 = "+delta3+"<br>";
	
	if (delta3_percent > 0.12 || delta3_percent < 0.08){
	  str += "<h2 style='color: red;'>WARNING : Delta3 change is out of range<br></h2>";
	}
	else{
		str += "<h2 style='color: green;'>Delta3 change in range<br></h2>";
	}
	str += "<h2> Predicted EOP value = "+EOP_viscosity+"<br>";
	str += "Target Hypo Viscosity = " + target_hypo_viscosity.toFixed(3) + "<br>";
	str += "Predicted delta2 = "+ delta2 +"<br></h2>";
	if (corrected_hypo_solution < 0.0){
	  str += "<h2>Recommended Hypo Dosage Value less than zero<br></h2>";
	}
	else{
		// if(corrected_hypo_solution>40){
		// 	corrected_hypo_solution=40;
		// }
	  str += "<h2>Recommended Hypo Dosage: "+ corrected_hypo_solution.toFixed(3) +" L/min<br></h2>";
	}
	delta2_prev = delta2
	Target_hypo = target_hypo_viscosity.toFixed(3);
	document.getElementById('info').innerHTML = str;
	document.getElementById('inputInfo').style.display = "none";
	document.getElementById('outputInfo').style.display = "block";
}

function resetForm() {
	document.getElementById('inputInfo').style.display = "block";
	document.getElementById('outputInfo').style.display = "none";

	document.getElementById("inputForm").reset();
	document.getElementById('prevTargetHypo').value = Target_hypo;
	document.getElementById('targetLoosePulpViscosity').value = 450;
}

document.getElementById('outputInfo').style.display = "none";
