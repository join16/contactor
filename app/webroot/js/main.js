
// ----- other global variables
var isContactsEditing = false;
var isGroupsEditing = false;
var isGroupsPairsAdding = false;
var isContactsPairsAdding = false;
var isPairsDeleting = false;
var isContactsSearched = false;
var isGroupsSearched = false;
var isGroupsClicked = false;
var isContactsChosungSearched = false;
var isCsvInputClicked = false;
var groupsPairsGroupsId;
var contactsPairsContactsId;
var insertedContactsId = '';
var insertedGroupsId = '';

// ----- functions called when documents loaded
function init() {
	addContactsBasicEvent();
	addGroupsBasicEvent();
	addGroupsRowEvent();
	addContactsRowEvent();
	addDocsEvent();
}

// ----- event binding functions
function addDocsEvent() {
	$('#pairsModal').on('click', function() {
		hideGroupsPairsModal();
		loadContacts({
			groups_id: groupsPairsGroupsId
		});
		isGroupsPairsAdding = false;
	});
	$('#bottomBtnArea').on('click', function() {
		submitGroupsPairs();
		isGroupsPairsAdding = false;
	});
	$('#centerDocs .list-body').on('click', function() {
		if (!isContactsEditing) {
			closeAllContactsRow();
		}
	});
	$('#leftDocs .list-body').on('click', function() {
		if (!isGroupsEditing && isGroupsClicked) {
			closeAllGroupsRow();
			isGroupsClicked = false;
			loadContacts();
		}
	});
	$('.row-last-input').on('keydown', function() {
		if (event.which == 9) {
			event.preventDefault();
			$(this).parents('.row-top').next().find('.memo')[0].focus();
		}
	});
	$('.memo').on('keydown', function() {
		if (event.which == 9) {
			event.preventDefault();
		}
	});
	$('#csvBtnArea').on('click', function() {
		$('#csvMenu').sideMenu();
	});
	$('#importCsvBtn').on('click', function() {
		if (!isCsvInputClicked) {
			$('#csvInput').click();	
		}	
	});
	$('#exportCsvBtn').on('click', loadCsvContacts);
	$('#csvInput').on('change', function() {
		var fileName = this.files[0].name;
		$(this).readCSV(function(objs) {
			csvContactsData.contacts = objs;
			csvContactsData.fileName = fileName;
			loadCsvSheet();
		});
	});
	$('#logoutBtn').on('click', function() {
		location.replace('./logoutAction.php');
	});
	$('#userEditBtn').on('click', loadUserEditForm);
}
function addUserFormEvent() {
	$('#userMenuEditBtn').on('click', function() {
		if ($(this).hasClass('active')) {
			$('#userEditContents .user-edit-input').addClass('hidden');
			$('#userEditContents .user-edit-text').removeClass('hidden');
			$('#editSubmitBtn, #editCancelBtn').addClass('hidden');
		} else {
			$('#userEditContents .user-edit-input').removeClass('hidden');
			$('#userEditContents .user-edit-text').addClass('hidden');	
			$('#editSubmitBtn, #editCancelBtn').removeClass('hidden');			
		}
	});
	$('#userEditMenu .user-edit-menu-row').on('click', function() {
		$(this).toggleClass('active');
	});
	$('#editSubmitBtn').on('click', function() {
		var dataInput = createDataInput();
		dataInput.user_id = "<?php echo $_SESSION['user_id']; ?>";
		$.ajax({
			url: phpURL + 'updateUser.php',
			data: dataInput,
			success: function() {
				$('#userMenuEditBtn').click();
			}
		});
	})
}
function createDataInput() {
	var inputs = $('#userEidtContents .user-edit-input').toArray();
	var obj = {};
	for (var i=0; i < inputs.length; i++) {
		var name = inputs[i].getAttribute('name');
		var value = inputs[i].value;
		obj[name] = value;
	}
	return obj;
}

function loadCsvSheet() {
	$('#csvSheet').html(templates['csvContacts'](csvContactsData));
	$('#csvSheet').removeClass('hidden');
	$('#csvSheet tbody tr').addCsvSheetEvent();
	$('#csvSubmitBtn').one('click', function() {
		var contactsArray = [];
		var rows = $('#csvSheet tbody tr.checked').toArray();
		$.each(rows, function(i, row) {
			contactsArray.push($(row).makeRowJson());
		});
		insertContactsArray(contactsArray);
	});
	$('#csvCheckAll').on('click', function() {
		$('#csvSheet tbody tr').checkCsvRow();
	});
	$('#csvUncheckAll').on('click', function() {
		$('#csvSheet tbody tr').uncheckCsvRow();
	});
	$('#csvCancelBtn').one('click', function() {
		$('#csvInput').val('');
		$('#csvSheet').addClass('hidden');
		$('#csvSheet').html('');
		$('#csvMenu').sideMenu('close');
	});
	$('#csvHideBtn').one('click', function() {
		$('#csvInput').val('');
		$('#csvSheet').addClass('hidden');
		$('#csvSheet').html('');			
	});	
}
function addContactsBasicEvent() {
	$("#newContactsBtn").on("click", toggleNewContactsRowOpened);
	$("#newContactsCancelBtn").on("click", closeNewContactsRow);
	$("#newContactsSubmitBtn").on("click", sendNewContactsForm);
	$("#contactsSearchInput").on("keyup", searchContacts);
	$('#contactsSearchInput').on('focus', function() {
		setSearchIconBlue(this);
	});
	$('#contactsSearchInput').on('blur', function() {
		unsetSearchIconBlue(this);
		if (this.value == '' || this.value == ' '  || this.value == '*') {
			hideContactsSearchNum();
		}
	});
	$('#pairsEditBtn').on('click', function() {
		if (!isPairsDeleting) {
			showPairsDeleteBtn();
			isPairsDeleting = true;
		} else {
			hidePairsDeleteBtn();
			isPairsDeleting = false;
		}
	});
	$('#centerDocs .list-head-column[sort-target]').on('click', function() {
		$('#contactsList').sortDiv({
			targetClass: 'list-row',
			columnName: $(this).attr('sort-target')
		});
	});
}
function addGroupsBasicEvent() {
	$("#newGroupsBtn").on("click", toggleNewGroupsRowOpened);
	$("#newGroupsCancelBtn").on("click", closeNewGroupsRow);
	$("#newGroupsSubmitBtn").on("click", sendNewGroupsForm);
	$("#groupsSearchInput").on("keyup", searchGroups);
	$('#groupsSearchInput').on('focus', function() {
		setSearchIconBlue(this);
	});			
	$('#groupsSearchInput').on('blur', function() {
		unsetSearchIconBlue(this);
		if (this.value == '' || this.value == ' '  || this.value == '*') {
			hideGroupsSearchNum();
		}		
	});	
}
function addContactsRowEvent() {
	$("#contactsList .list-row").on("click", function() {
		event.stopPropagation();
		if (isGroupsPairsAdding) {
			toggleChecked(this);
		} else if (!isContactsEditing) {
			toggleListRowOpened(this);
		}
	});
	$('#contactsList .list-row .contacts-delete-btn').on('click', function() {
		event.stopPropagation();
		if (!$(this).parents('.list-row').hasClass('edit-mode')) {
			requestDeleteContacts(this);
		} else {
			hideRowInput(this);
			$(this).parents('.list-row').removeClass('edit-mode');
			isContactsEditing = false;
		}		
	});
	$('#contactsList .list-row .contacts-edit-btn').on('click', function() {
		event.stopPropagation();
		if ($(this).parents('.list-row').hasClass('edit-mode')) {
			submitContactsInput(this);
			isContactsEditing = false;
		} else {
			openListRow(this.parentNode.parentNode);
			showRowInput(this);
			isContactsEditing = true;	
		}
	});
	$('#contactsList .pairs-btn').on('click', function() {
		event.stopPropagation();
		pairsBtnClicked(this);
	});
	$('#contactsList .memo').on('keydown', function() {
		if (event.which == 9) {
			event.preventDefault();
		}
	})
}
function pairsBtnClicked(current) {
	var data = {
		contacts_id: getContactsRowId(current),
		groups_id: groupsPairsGroupsId
	};
	deleteGroupsPairs({
		dataInput: data,
		targetRow: $(current).parents('.list-row')
	});
}
function addOneContactRowEvent(row) {
	row.find('.contacts-delete-btn').on('click', function() {
		event.stopPropagation();
		if (!$(this).parents('.list-row').hasClass('edit-mode')) {
			requestDeleteContacts(this);
		} else {
			hideRowInput(this);
			isContactsEditing = true;
		}		
	});
	row.find('.contacts-edit-btn').on('click', function() {
		event.stopPropagation();
		if ($(this).parents('.list-row').hasClass('edit-mode')) {
			submitContactsInput(this);
			isContactsEditing = false;
		} else {
			openListRow(this.parentNode.parentNode);
			showRowInput(this);
			isContactsEditing = true;	
		}
	});
	row.find('.pairs-btn').on('click', function() {
		event.stopPropagation();
		pairsBtnClicked(this);
	});	
	row.find('.memo').on('keydown', function() {
		if (event.which == 9) {
			event.preventDefault();
		}
	})	
}
function addGroupsRowEvent() {
	$("#groupsList .list-row").on("click", function() {
		event.stopPropagation();
		groupsRowClicked(this);
	});
	$('.list-row .groups-delete-btn').on('click', function() {
		event.stopPropagation();
		if (!$(this).parents('.list-row').hasClass('edit-mode')) {
			requestDeleteGroups(this);
		} else {
			hideRowInput(this);
			isGroupsEditing = false;
		}		
	});
	$('#groupsList .list-row .groups-edit-btn').on('click', function() {
		event.stopPropagation();
		if ($(this).parents('.list-row').hasClass('edit-mode')) {
			submitGroupsInput(this);
			isGroupsEditing = false;
		} else {
			openListRow(this.parentNode.parentNode);
			showRowInput(this);
			isGroupsEditing = true;
		}
	});	
	$('#groupsList .list-row .add-contacts-area').on('click', function() {
		event.stopPropagation();
		showGroupsPairsModal();
		$('#contactsList').parent('.list-body').addClass('check-mode');
		$("#contactsList .list-row").addClass('check-mode');
		isGroupsPairsAdding = true;
		loadContactsNotPairs();
	});
}
function addOneGroupRowEvent(row) {
	row.find('.groups-delete-btn').on('click', function() {
		event.stopPropagation();
		if (!$(this).parents('.list-row').hasClass('edit-mode')) {
			requestDeleteGroups(this);
		} else {
			hideRowInput(this);
		}		
	});
	row.find('.groups-edit-btn').on('click', function() {
		event.stopPropagation();
		if (isGroupsEditing) {
			submitGroupsInput(this);
			isGroupsEditing = false;
		} else {
			openListRow(this.parentNode.parentNode);
			showRowInput(this);
			isGroupsEditing = true;	
		}
	});
	row.find('.add-contacts-area').on('click', function() {
		event.stopPropagation();
		showGroupsPairsModal();
		$('#contactsList').parent('.list-body').addClass('check-mode');
		$("#contactsList .list-row").addClass('check-mode');
		isGroupsPairsAdding = true;
		loadContactsNotPairs();
	});	
}
function groupsRowClicked(current) {
	if (!isGroupsEditing) {
		if (!$(current).hasClass('opened')) {
			var message = '"' + getGroupsColumnValue(current, 'name') + '" 검색 결과';
			showContactsMessage(message);
		} else {
			hideContactsMessage();
		}		
		if ($(current).hasClass('opened')) {
			loadContacts();
			isGroupsClicked = false;
		} else {
			loadContacts({
				groups_id: $(current).find('.groups-id').val()
			});
			isGroupsClicked = true;
		}			
		toggleListRowOpened(current);
		groupsPairsGroupsId = getGroupsRowId(current);
		console.log(groupsPairsGroupsId);
		closeNewContactsRow();
	}
}

// ----- functions getting data from HTML & request ajax
//---- get id of row
function getContactsRowId(current) {
	return $(current).parents('.list-row').find('.contacts-id').val();
}
function getGroupsRowId(current) {
	if ($(current).parents('.list-row').length > 0) {
		return $(current).parents('.list-row').find('.groups-id').val();
	} else if ($(current).hasClass('list-row')) {
		return $(current).find('.groups-id').val();
	} else {
		console.log('ERROR: this variable is not in group-list-row');
	}
}

//---- get column value of row 
function getGroupsColumnValue(current, column_name) {
	return $(current).find('.groups-' + column_name + '-column').html();
}

//----- search functions -----
function searchContacts() {
	isContactsSearched = true;
	var inputVal = $("#contactsSearchInput").val();
	if (inputVal == ' ' || inputVal == '*') {
		inputVal = '';
		isContactsSearched = false;
	}
	var data = {
		searchKey: $("#contactsSearchKey").val(),
		searchInput: inputVal
	};
	if (isChosungIncluded(data.searchInput) && data.searchKey == 'name') {
		data.chosung = getChosungIndexArray(data.searchInput);
		isContactsChosungSearched = true;
		delete data.searchInput;
	}
	if (isGroupsPairsAdding) {
		loadContactsNotPairs(data);
	} else if (isGroupsClicked) {
		data.groups_id = groupsPairsGroupsId;
		loadContacts(data);
	} 
	else {
		loadContacts(data);
	}
}
function searchGroups() {
	isGroupsSearched = true;
	var inputVal = $('#groupsSearchInput').val();
	if (inputVal == ' ' || inputVal == '*') {
		inputVal = '';
		isGroupsSearched = false;
	}
	var data = {
		searchInput: inputVal
	}
	loadGroups(data);
}

//----- inserting function
function sendNewContactsForm() {
	$('#newContactsRow').validateInputs({
		table: 'contacts',
		name: 'presence',
		phone: 'presence, uniqueness, phoneNumber',
		age: 'presence, unsigned',
		success: function() {
			var inputs = $("#newContactsRow").find(".new-input").toArray();
			var data = {};
			$.each(inputs, function(i, input) {
				data[input.getAttribute("name")] = input.value;
			});
			data.table = 'contacts';
			insertRows({
				dataInput: data,
				callback: function(contactsId) {
					closeNewContactsRow();
					insertedContactsId = contactsId;
					if (isGroupsClicked) {
						var data = {
							contacts_id: [contactsId],
							groups_id: groupsPairsGroupsId
						}
						insertGroupsPairs(data);
					} else {
						loadContacts();
					}
				}
			}); // 새로운 row를 삽입한 후에 전체를 다 불러오기 vs 새로 추가된 행만 불러와서 js로 추가하기?
		}
	});
}
function sendNewGroupsForm() {
	$('#newGroupsRow').validateInputs({
		table: 'groups',
		name: 'presence, uniqueness',
		success: function() {
			var inputs = $("#newGroupsRow").find(".new-input").toArray();
			var data = {};
			$.each(inputs, function(i, input) {
				data[input.getAttribute("name")] = input.value;
			});
			data.table = 'groups';
			insertRows({
				dataInput: data,
				callback: function(groupsId) {
					insertedGroupsId = groupsId;
					closeNewGroupsRow();
					loadGroups();
				}
			});	
		}
	})
}

//----- deleting functions -----
function requestDeleteContacts(current) {
	console.log('delete request');
	var data = {
		contacts_id: getContactsRowId(current),
		table: 'contacts'
	};
	deleteRows({
		dataInput: data,
		callback: function() {
			loadContacts();
		}
	});
}
function requestDeleteGroups(current) {
	console.log('delete request');
	var data = {
		groups_id: getGroupsRowId(current),
		table: 'groups'
	};
	deleteRows({
		dataInput: data,
		callback: function() {
			loadGroups();
			hideContactsMessage();
			loadContacts();
		}
	});
}
// ---- editing functions -----
function submitContactsInput(current) {
	parentRow = $(current).parents('.list-row');
	parentRow.validateInputs({
		table: 'contacts',
		name: 'presence',
		phone: 'presence, phoneNumber',
		age: 'presence',
		success: function() {
			var parentRow = $(current).parents('.list-row');
			var inputs = parentRow.find('.contacts-input').toArray();
			var data = {};
			$.each(inputs, function(i, input) {
				data[input.getAttribute('name')] = input.value;
			});
			data.memo = $(current).parents('.list-row').find('.contacts-memo').val();
			data.information = {
				id: getContactsRowId(current),
				table: 'contacts'
			}
			update({
				dataInput: data,
				targetRow: parentRow,
				callback: function(jsonObjs) {
					contactsData.contacts = jsonObjs;
					this.targetRow.html(templates.contacts(contactsData));
					this.targetRow.find('.row-top').unwrap();
					addOneContactRowEvent(this.targetRow);
				}
			});
		}
	});
}
function submitGroupsInput(current) {
	$(current).parents('.list-row').validateInputs({
		table: 'groups',
		name: 'presence',
		success: function() {
			var parentRow = $(current).parents('.list-row');
			var inputs = parentRow.find('.groups-input').toArray();
			var data = {};
			$.each(inputs, function(i, input) {
				data[input.getAttribute('name')] = input.value;
			});
			data.memo = $(current).parents('.list-row').find('.groups-memo').val();
			data.information = {
				id: getGroupsRowId(current),
				table: 'groups'
			}
			update({
				dataInput: data,
				targetRow: parentRow,
				callback: function(jsonObjs) {
					groupsData.groups = jsonObjs;
					this.targetRow.html(templates.groups(groupsData));
					this.targetRow.find('.row-top').unwrap();
					addOneGroupRowEvent(this.targetRow);
				}
			});			
		}
	});
}

//----- contacts-groups-pairs functions -----
function submitGroupsPairs() {
	var data = {
		contacts_id: []
	};
	var checkedContacts = $('#contactsList .list-row.checked').toArray();
	$.each(checkedContacts, function(i, contact) {
		data.contacts_id.push($(contact).find('.contacts-id').val());
	});
	data.groups_id = groupsPairsGroupsId;
	insertGroupsPairs(data);
}

function escapeContactsColumn(column) {
	return 'contacts-' + column + '-column';
}
function escapeGroupsColumn(column) {
	return 'groups-' + column + '-column';
}

//----- loading Templates -----
function loadTemplate(fileName, templateName) {
	var requestURL = templateURL + fileName + ".html";
	$.ajax({
		url: requestURL,
		dataType: "html",
		async: false,
		success: function(result) {
			templates[templateName] = _.template(result);
		}
	});
}

// ----- ajax functions -----
function loadContacts(dataInput) {
	if (dataInput == undefined) {
		dataInput = "";
	}
	$.ajax({
		url: phpURL + "contacts.php",
		method: "GET",
		data: dataInput,
		success: function(result) {
			var objs = $.parseJSON(result);
			if (objs.length == 0 && !isContactsSearched) {
				emptyData.text = '연락처를 추가해 주세요';
				emptyData.tableName = 'contacts';
				$("#contactsList").html(templates.empty(emptyData));
				return;
			}
			contactsData.contacts = objs;
			if (insertedContactsId != '') {
				contactsData.insertedId = insertedContactsId;
				insertedContactsId = '';
			} else {
				contactsData.insertedId = '';
			}
			$("#contactsList").html(templates.contacts(contactsData));
			if (isPairsDeleting) {
				hidePairsDeleteBtn();
				isPairsDeleting = false;
			}
			if (isContactsChosungSearched) {
				var inputLength = dataInput.chosung.length;
				$('#contactsList .contacts-name-column').highlightChosung(inputLength);
				isContactsChosungSearched = false;
			} else if (isContactsSearched) {
				var columnClass = '.' + escapeContactsColumn(dataInput.searchKey);
				var text = dataInput.searchInput;
				var totalNum = objs.length;
				$('#contactsList ' + columnClass).highlight(text);
				showContactsSearchNum(totalNum);
				isContactsSearched = false;
			} else {
				hideContactsSearchNum();
			}
			addContactsRowEvent();
			$('#insertedContacts').yellowFade('#CCCCFF', 1000);
		}
	});
}
function loadGroups(dataInput) {
	if (dataInput == undefined) {
		dataInput = '';
	}
	$.ajax({
		url: phpURL + 'groups.php',
		method: 'GET',
		data: dataInput,
		success: function(result) {
			var objs = $.parseJSON(result);
			if (objs.length == 0 && !isGroupsSearched) {
				emptyData.text = '그룹을 추가해 주세요';
				emptyData.tableName = 'groups';
				$("#groupsList").html(templates.empty(emptyData));
				return;
			}			
			groupsData.groups = objs;
			if (insertedGroupsId != '') {
				groupsData.insertedId = insertedGroupsId;
				insertedGroupsId = '';
			} else {
				groupsData.insertedId = '';
			}
			$("#groupsList").html(templates.groups(groupsData));
			if (isGroupsSearched) {
				var columnClass = '.' + escapeGroupsColumn('name');
				var text = dataInput.searchInput;
				var totalNum = objs.length;
				$('#groupsList ' + columnClass).highlight(text);
				showGroupsSearchNum(totalNum);
				isGroupsSearched = false;
			} else {
				hideGroupsSearchNum();
			}
			addGroupsRowEvent();
			$('#insertedGroups').yellowFade('#CCCCFF', 1000);
		}
	});
}
function insertRows(params) {
	var dataInput = params.dataInput;
	if (dataInput == '' || dataInput == undefined) {
		console.log('ERROR: wrong params');
		return;
	}
	$.ajax({
		url: phpURL + 'insert.php',
		data: dataInput,
		method: 'POST',
		success: function(result) {
			addTopMessage('성공적으로 추가되었습니다');
			params.callback(result);
		}
	})	
}
function deleteRows(params) {
	var dataInput = params.dataInput;
	if (dataInput == '' || dataInput == undefined) {
		console.log('ERROR: wrong params');
		return;
	}
	$.ajax({
		url: phpURL + 'delete.php',
		data: dataInput,
		method: 'GET',
		success: function() {
			addTopMessage('성공적으로 삭제되었습니다');
			delete dataInput.table;
			deletePairs(dataInput);
			params.callback();
		}
	});	
}
function update(params) {
	var dataInput = params.dataInput;
	var tableName = dataInput.information.table;
	if (dataInput == '' || dataInput == undefined) {
		console.log('ERROR: wrong params');
		return;
	}
	$.ajax({
		url: phpURL + 'update.php',
		data: dataInput,
		method: 'POST',
		success: function(result) {
			var objs = $.parseJSON(result);
			addTopMessage('성공적으로 수정되었습니다');
			params.targetRow.removeClass('edit-mode');
			params.callback(objs);
		}
	});
}
function loadContactsNotPairs(dataInput) {
	if (dataInput == undefined) {
		dataInput = {};
	}
	dataInput.groups_id = groupsPairsGroupsId;
	$.ajax({
		url:phpURL + 'loadContactsNotPairs.php',
		data: dataInput,
		method: 'GET',
		success: function(result) {
			console.log(result);
			var objs = $.parseJSON(result);
			contactsData.contacts = objs;
			$("#contactsList").html(templates.contacts(contactsData));
			addContactsRowEvent();
			$('#contactsList .list-row').addClass('check-mode');
			hideContactsSearchNum();
		}
	});
}
function insertGroupsPairs(dataInput) {
	$.ajax({
		url: phpURL + 'insertGroupsPairs.php',
		data: dataInput,
		method: 'POST',
		success: function(result) {
			addTopMessage('성공적으로 저장되었습니다');
			hideGroupsPairsModal();
			loadContacts({
				groups_id: dataInput.groups_id
			});
		}
	});
}
function deleteGroupsPairs(params) {
	$.ajax({
		url: phpURL + 'deleteGroupsPairs.php',
		data: params.dataInput,
		method: 'GET',
		success: function() {
			params.targetRow.remove();
		}
	});
}
function deletePairs(dataInput) {
	$.ajax({
		url: phpURL + 'deletePairs.php',
		data: dataInput,
		success: function() {
		}
	})
}
function insertContactsArray(objArray) {
	$.ajax({
		url: phpURL + 'insertContactsArray.php',
		method: 'POST',
		data: {contacts: objArray},
		success: function(result) {
			console.log(result);
			addTopMessage('성공적으로 추가되었습니다');
			$('#csvSheet').addClass('hidden');
			$('#csvMenu').sideMenu('close');
			loadContacts();
		}
	})
}
function loadMyPage() {
	$.ajax({
		url: phpURL + 'mypage.php',
		success: function(result) {
			var userObj = $.parseJSON(result);
			userObj = userObj[0];
			$('#userName').html(userObj.nickname);
			$('#userProfile').attr('src', userObj.img_link);
		}
	})
}
function loadCsvContacts() {
	$.ajax({
		url: phpURL + 'contacts.php',
		success: function(result) {
			var objs = $.parseJSON(result);
			exportCsv(objs);
		}
	})
}
function loadUserEditForm() {
	$.ajax({
		url: phpURL + 'mypage.php',
		success: function(result) {
			var userObj = $.parseJSON(result);
			userObj = userObj[0];
			$('#userEdit').html(templates.userForm(userObj));
			$('#userEdit').removeClass('hidden');
			addUserFormEvent();
		}
	})
}
function checkSession() {
	$.ajax({
		url: phpURL + uriParser.php,
		success: function(result) {
			if (!result) {
				location.replace('./login/');
			} else if (result == 'admin') {
				location.replace('./admin');
			} 
		}
	})
}
window.addEventListener("load", init, false);