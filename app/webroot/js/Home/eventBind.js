$(window).on('load', function() {
	$("#groupsBody").niceScroll();
	$('#contactsBody').niceScroll();
	$('#groupsAddBtn').on('click', function() {
		$(this).toggleClass('switch-on');
		$('#groupsBody').animate({scrollTop: 0}, 'fast');
		$('#newGroups').toggleClass('open');
	});
	$('#contactsAddBtn').on('click', function() {
		$(this).toggleClass('switch-on');
		$('#contactsBody').animate({scrollTop: 0}, 'fast');
		$('#newContacts').toggleClass('open');
	})
	$('.search-input').on('focus', function() {
		$(this).parent().addClass('focus');
	});
	$('.search-input').on('blur', function() {
		$(this).parent().removeClass('focus');
	});
	$('#groupsBody').groupsEvent();
	$('#contactsBody').contactsEvent();
	$('#groupsDetailBody').groupsDetailEvent();
	$('#groupsDetailBody').groupsDetailEventInit();
	$('#allGroups').setPopArrow();
	$('#contactsSearchInput').on('keyup', function() {
		var dataInput = {
			searchKey: $('#contactsSearchKey').val(),
			searchInput: $('#contactsSearchInput').val()
		};
		if ($('#groupsDetailId').val() != 0) {
			dataInput.groupsId = $('#groupsDetailId').val();
		}
		requestAjax({
			url: encodeUrl({
				controller: 'contacts',
				action: 'show'
			}),
			data: dataInput,
			loading: false,
			targetDiv: '#contactsBody',
			success: function() {
				$('#contactsBody').contactsEvent();
			}
		})
	});
});

jQuery.fn.setPopArrow = function() {
	var topPos = this.offset().top - 64;
	$('#popArrow').css({top: topPos});
}
jQuery.fn.groupsEvent = function() {
	var target = this;
	$('#insertedGroups').yellowFade('yellow', '300', 'backgroundColor');	
	this.find('#groupsSubmitBtn').on('click', function() {
		event.preventDefault();
		event.stopPropagation();
		data = $(this).parents('form').serialize();
		requestAjax({
			url: '/contactor/groups/add',
			data: data,
			method: 'POST',
			targetDiv: '#groupsBody',
			success: function() {
				$('#groupsAddBtn').removeClass('switch-on');
				$('#groupsBody').groupsEvent();
			}
		});
	});
	this.find('.delete-btn').on('click', function() {
		event.stopPropagation();
		requestAjax({
			url: '/contactor/groups/delete',
			data: { id: $(this).parents('.contents-row').attr('groups-id') },
			targetDiv: '#groupsBody',
			method: 'POST',
			success: function() {
				$('#groupsBody').groupsEvent();
			}
		});
	});
	this.find('.contents-row.groups[groups-id], #allGroups').on('click', function() {
		$(this).setPopArrow();
		$('#body').removeClass('contacts');
		target.find('.contents-row.groups').removeClass('selected');
		$(this).addClass('selected');
		$('#contactsBody').html($('#ajaxModal').html());
		requestAjax({
			url: '/contactor/groups/detail/' + $(this).attr('groups-id'),
			targetDiv: '#groupsDetailBody',
			loading: false,
			success: function() {
				if ($('#groupsDetailBody').html()) {
					$('#groupsDetailArea').removeClass('all-groups');
				} else {
					$('#groupsDetailArea').addClass('all-groups');
				}
				$('#groupsDetailBody').groupsDetailEvent();
			}
		})
		requestAjax({
			url: encodeUrl({
				controller: 'contacts',
				action: 'show'
			}),
			data: {
				groupsId: $(this).attr('groups-id')
			},
			targetDiv: '#contactsBody',
			loading: false,
			success: function() {
				$('#contactsBody').contactsEvent();
			}
		});
	}); 
}

jQuery.fn.contactsEvent = function() {
	var target = this;
	$('#insertedContacts').yellowFade('#DDD', '300', 'backgroundColor');
	this.find('.submit-btn').on('click',function() {
		event.preventDefault();
		event.stopPropagation();
		data = $(this).parents('form').serialize();
		requestAjax({
			url: '/contactor/contacts/add',
			data: data,
			method: 'POST',
			targetDiv: '#contactsBody',
			success: function() {
				$('#contactsAddBtn').removeClass('switch-on');
				$('#contactsBody').contactsEvent();
			}
		})		
	});
	this.find('.delete-btn').on('click', function() {
		event.stopPropagation();
		requestAjax({
			url: '/contactor/contacts/delete',
			data: { id: $(this).parents('.contents-row').attr('contacts-id') },
			targetDiv: '#contactsBody',
			method: 'POST',
			success: function() {
				$('#contactsBody').contactsEvent();
			}
		});
	});
	this.find('.contents-row').on('click', function() {
		event.stopPropagation();
		if ($(this).attr('id') == 'newContacts') {
			return;
		}
		requestAjax({
			url: encodeUrl({
				controller: 'contacts',
				action: 'detail',
				params: [$(this).attr('contacts-id')]
			}),
			targetDiv: '#contactsDetailBody',
			success: function() {
				$('#body').addClass('contacts');
				target.find('.contents-row').removeClass('selected');
				$(this).addClass('selected');
				$('#contactsDetailBody').contactsDetailEvent();
			}
		});
	});
}
jQuery.fn.groupsDetailEvent = function() {
	$('#groupsDetailEditBtn').on('click', function() {
		$(this).parents('.groups-detail-page').addClass('hidden');
	});
	$('#groupsDetailSubmitBtn').on('click', function() {
		var data = $(this).parents('form').encodeFormData('Group');
		var groupsId = $('#groupsDetailId').val();
		requestAjax({
			url: '/contactor/groups/edit/' + groupsId,
			data: data,
			method: 'POST',
			targetDiv: '#groupsDetailBody',
			success: function() {
				requestAjax({
					url: 'groups/show',
					targetDiv: '#groupsBody',
					loading: false,
					success: function() {
						$('#groupsBody').groupsEvent();
						$('#allGroups').removeClass('selected');	
						$('.contents-row[groups-id= "' + groupsId +'"]').addClass('selected');
					}
				})
				$('#groupsDetailBody').groupsDetailEvent();
				
			}
		});		
	});
	$('#pairsAddBtn').on('click', function() {
		requestAjax({
			url: encodeUrl({
				controller: 'contacts',
				action: 'show'
			}),
			data: {
				notGroupsId: $('#groupsDetailId').val()
			},
			targetDiv: '#contactsBody',
			success: function() {
				$('#contactsBody').pairsEvent();
			}
		});
	});
}
jQuery.fn.groupsDetailEventInit = function() {
	$('#groupsDetailMenu input.groups-detail-menu-btn').on('click', function() {
		if ($(this).attr('menu') == 'all-groups') {
			$('#groupsDetailArea').addClass('all-groups');
		} else if ($('#groupsDetailId').val() != 0) {
			$('#groupsDetailArea').removeClass('all-groups');
		}
	});
}
jQuery.fn.pairsEvent = function() {
	this.find('.contents-row').on('click', function() {
		$(this).toggleClass('selected');
	});
	$('#pairsSubmitBtn').one('click', function() {
		var selected = $('#contactsBody').find('.contents-row.selected').map(function() {
			return $(this).attr('contacts-id');
		}).get();
		var data = {
			groups_id: $('#groupsDetailId').val(),
			contacts_id: selected
		};
		requestUrl = encodeUrl({
			controller: 'groups',
			action: 'addContacts'
		});
		requestAjax({
			url: requestUrl,
			data: data,
			method: 'POST',
			targetDiv: '#contactsBody',
			success: function() {
				$('#contactsBody').contactsEvent();
				var targetRow = $('.contents-row[groups-id = "' 
				+ data.groups_id +'"]')
				.find('.groups-number-text');
				targetRow.html(targetRow.html()*1 + selected.length);
			}
		});
	});
}

jQuery.fn.contactsDetailEvent = function() {
	this.find('#contactsEditBtn').on('click', function() {
		$('#contactsDetailContents').addClass('edit');
	});
	this.find('#contactsSubmitBtn').on('click', function() {
		var data = $('#contactsDetailForm').encodeFormData('Contact');
		$('#ajaxModal').removeClass('hidden');
		requestAjax({
			url: encodeUrl({
				controller: 'contacts',
				action: 'edit',
				params: [$('#contactsDetailId').val()]
			}),
			data: data,
			method: 'POST',
			loading: false,
			targetDiv: '#contactsDetailBody',
			success: function() {
				$('#contactsDetailBody').contactsDetailEvent();
				requestAjax({
					url: 'contacts/show',
					targetDiv: '#contactsBody',
					success: function() {
						$('#contactsBody').contactsEvent();
					}
				})
			}
		}) 
	})
}