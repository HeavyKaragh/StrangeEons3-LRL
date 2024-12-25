const OLD_SE2 = true;
if($Type == 'objectivetype_attachment'){
	$ObjectiveType = 'Objective';
}else{
	$ObjectiveType = 'ObjectiveAlly';
}
debug('objectiveType: '+$ObjectiveType);
if($ObjectiveType == 'Objective'){
	useLibrary('res://TheLordOfTheRingsLCG/Objective/component.js');
}else{
	useLibrary('res://TheLordOfTheRingsLCG/ObjectiveAlly/component.js');
}
if( sourcefile == 'Quickscript' ){testDIYScript();}
