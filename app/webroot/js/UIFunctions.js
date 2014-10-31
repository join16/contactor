function toggleListRowOpened(current) {
	if ($(current).hasClass("opened")) {	
		$(current).removeClass("opened");
	} else {
		closeAllListRow(current);
		$(current).addClass("opened");	
	}
}
function openListRow(current) {
	$(current).parents(".list-body").find(".list-row").removeClass("opened");
	$(current).addClass("opened");
}
function closeAllListRow(current) {
	$(current).parents(".list-body").find(".list-row").removeClass("opened");
}
function closeAllContactsRow() {
	$('#contactsList .list-row').removeClass('opened');
}
function closeAllGroupsRow() {
	$('#groupsList .list-row').removeClass('opened');
	hideContactsMessage();
}
function toggleNewContactsRowOpened() {
	$('#newContactsRow').toggleClass('no-height');
}
function openNewContactsRow() {
	$('#newContactsRow').removeClass('no-height');
}
function closeNewContactsRow() {
	$("#newContactsRow").addClass("no-height"); // input 에 focus가 가있으면 transitioned가 먹통이 됨
	$('#newContactsRow').one('transitionend', function() {
		clearNewContactsRow();
	});		
}
function clearNewContactsRow() {
	$('#newContactsRow .new-input').val('');
	$('#newContactsRow select.new-input').val('male');
}
function toggleNewGroupsRowOpened() {
	$('#newGroupsRow').toggleClass('no-height');
}
function openNewGroupsRow() {
	$('#newGroupsRow').removeClass('no-height');
}
function closeNewGroupsRow() {
	$("#newGroupsRow").addClass("no-height"); // input 에 focus가 가있으면 transitioned가 먹통이 됨
	$('#newGroupsRow').one('transitionend', function() {
		clearNewGroupsRow();
	});		
}
function clearNewGroupsRow() {
	$('#newGroupsRow .new-input').val('');
	$('#newGroupsRow select.new-input').val('male');
}
function showRowInput(current) {
	$(current).parents('.list-row').addClass('edit-mode');
	$(current).parents('.list-row').find('.memo').attr('readonly', false);
}
function hideRowInput(current) {
	$(current).parents('.list-row').removeClass('edit-mode');
	$(current).parents('.list-row').find('.memo').attr('readonly', true);
}
function toggleChecked(current) {
	$(current).toggleClass('checked');
}
function setContactsCheckMode() {
	$('#contactsList .list-row').addClass('check-mode');
}
function setSearchIconBlue(current) {
	$(current).siblings('.search-btn').addClass('search-input-focused');
}
function unsetSearchIconBlue(current) {
	$(current).siblings('.search-btn').removeClass('search-input-focused');
}
function showContactsMessage(message) {
	$('#contactsMessageRow').removeClass('no-height');
	$('#contactsMessage').html(message);
}
function hideContactsMessage() {
	$('#contactsMessageRow').addClass('no-height');	
}
function showGroupsPairsModal() {
	$('#pairsModal').removeClass('hidden');
	$('#centerDocs').addClass('modal-on');
	$('#bottomBar').removeClass('no-height');
	$('#contactsMessageRow').addClass('no-height');
	$('#newContactsBtn').attr('disabled', 'disabled');
}
function hideGroupsPairsModal() {
	$('#pairsModal').addClass('hidden');
	$('#centerDocs').removeClass('modal-on');
	$('#bottomBar').addClass('no-height');	
	$('#contactsMessageRow').removeClass('no-height');
	$('#newContactsBtn').attr('disabled', false);
}
function showPairsDeleteBtn() {
	$('#contactsList .list-row .contacts-pairs-column').removeClass('no-width');
	$('#pairsEditBtn').val('확인');
}
function hidePairsDeleteBtn() {
	$('#contactsList .list-row .contacts-pairs-column').addClass('no-width');	
	$('#pairsEditBtn').val('목록 수정');
}
function showContactsSearchNum(number) {
	$('#contactsSearchNum').html(number);
	$('#contactsSearchNum').removeClass('hidden');
}
function hideContactsSearchNum() {
	$('#contactsSearchNum').addClass('hidden');
}
function showGroupsSearchNum(number) {
	$('#groupsSearchNum').html(number);
	$('#groupsSearchNum').removeClass('hidden');
}
function hideGroupsSearchNum() {
	$('#groupsSearchNum').addClass('hidden');
}
function addTopMessage(message, isRed) {
	if (isRed == undefined) {
		isRed = false;
	}
	var messageDiv = document.createElement('div');
	messageDiv.setAttribute('class', 'message-div');
	if (isRed) {
		$(messageDiv).addClass('red');
	}
	var messageText = document.createElement('h5');
	messageText.setAttribute('class', 'message-text')
	messageText.innerHTML = message;
	messageDiv.appendChild(messageText);
	$('#messageArea').append(messageDiv);
	window.setTimeout(function() {
		$(messageDiv).addClass('transparent');
		window.setTimeout(function() {
			$(messageDiv).addClass('no-width');
			$(messageDiv).one('transitionend', function() {
				$(this).remove();
			})
		}, 500);
	}, 500);
}