var inputField = document.getElementById('input-field');
var keyboard = document.getElementById('keyboard');
var previousValue;
var selectedAction;

var actionHandlers = {
	'mult': function(first, second) {
		return first * second;
	},

	'plus': function(first, second) {
		return parseInt(first) + parseInt(second);
	},

	'minus': function(first, second) {
		return first - second;
	},

	'divide': function(first, second) {
		if(second == 0) {
			return 'Zero divide';
		}
		return parseInt(first) / parseInt(second);
	},

	'pow': function(first) {
		return Math.pow(first, 2);
	}, 

	'sqrt': function(first) {
		return Math.sqrt(first);
	}
}

keyboard.addEventListener('click', function(event) {
	var elem = event.target;
	if(!isButton(elem)) {
		return;
	}

	if(!isActionButton(elem)) {
		var hasPoint = inputField.textContent.indexOf('.') != -1;
		if(elem.textContent == '.' && hasPoint) {
			return;
		}
		inputField.textContent = inputField.textContent + elem.textContent;
		return;
	}

	var actionType = getActionType(elem);
	
	if(actionType == "result") {
		if(selectedAction) {
			var value = selectedAction(previousValue, inputField.textContent);
			inputField.textContent = value;
		}
		return;
	}	

	if((actionType == 'pow') || (actionType == 'sqrt')) {
		var value = inputField.textContent;
		selectedAction = actionHandlers[actionType];
		inputField.textContent = selectedAction(value);
		return;
	}



	if(actionType == 'clear') {
		previousValue = null;
		selectedAction = null;
		inputField.textContent = '';
		return;
	}

	if(actionType == 'back') {
		inputField.textContent = inputField.textContent.substring(0, inputField.textContent.length - 1);
		return; 
	}

	selectedAction = actionHandlers[actionType];

	previousValue = inputField.textContent;
	inputField.textContent = "";
});

function isButton(elem) {
	return elem.className == 'calc-button';
}

function isActionButton(elem) {
	return elem.hasAttribute('data-action');
}

function getActionType(elem) {
	var type = elem.getAttribute('data-action');
	return type;	
}




