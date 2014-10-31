function requestAjax(params) {
	// params: requestUrl, targetDiv, dataInput, success, method
	var method;
	var async;
	var dataInput;
	var loading;
	if (params.method == undefined) {
		method = 'GET'
	} else {
		method = params.method;
	}
	if (params.async == undefined) {
		async = true
	} else {
		async = params.async;
	}
	if (params.data == undefined) {
		dataInput = '';
	} else {
		dataInput = params.data;
	}
	if (params.loading == 'true' || params.loading == undefined) {
		loading = true;
	} else {
		loading = false;
	}
	if (loading) {
		$('#ajaxModal').removeClass('hidden');		
	}
	$.ajax({
		url: params.url,
		data: dataInput,
		method: method,
		async: async,
		success: function(result) {
			if (loading) {
				$('#ajaxModal').addClass('hidden');				
			}
			if (params.targetDiv != undefined && params.targetDiv != '') {
				$(params.targetDiv).html(result);
			}
			if (params.success != undefined && params.success != '') {
				params.success(result);
			}
		}
	})
}
jQuery.fn.encodeFormData = function(modelName) {
	var resultObj = {};
	resultObj[modelName] = {};
	var inputs = this.find('[name]').toArray();
	for (var i=0; i < inputs.length; i++) {
		resultObj[modelName][inputs[i].name] = inputs[i].value;
	}
	return resultObj;
}

function encodeUrl(params) {
	var result = '';
	var rootPath = '/contactor/';
	if (params.controller) {
		result = rootPath + params.controller + '/';
	}
	if (params.action) {
		result += params.action + '/';
	}
	if (params.params) {
		for (var i=0; i < params.params.length; i++) {
			result += params.params[i] + '/';
		}
	}
	return result;
}