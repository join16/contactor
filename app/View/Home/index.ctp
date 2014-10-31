<?php 
	$this->Html->css('Home/index', array('inline' => false)); 
	$this->Html->script('plugins/jquery.nicescroll', array('inline' => false));
	$this->Html->script('Home/index', array('inline' => false));
	$this->Html->script('Home/eventBind', array('inline' => false));
?>
<div class = "contents-div groups-detail">

	<div id = "groupsDetailArea" class = "groups-detail-area all-groups">
		<div id = "groupsDetailMenu" class = "groups-detail-menu">
			<input type = "button" class = "groups-detail-menu-btn all-groups" value = "전체그룹관리" menu = "all-groups"/>
			<input type = "button" class = "groups-detail-menu-btn" value = "그룹상세정보"/>
		</div>	
		<div id = "groupsDetailBody" class = "groups-detail-body"><?php echo $group_detail; ?></div>
		<div class = "groups-detail-body all-groups">
			<div class = "img-btn groups-icon"></div>
			<h4 class = "all-groups-detail-text total-groups">전체 그룹 수</h4>
			<h4 id = "totalGroups" class = "all-groups-detail-text total-groups number"></h4>

		</div>	
	</div>
</div>
<div class = "contents-div groups">
	<div class = "contents header">
		<h3 class = "contents-header-title groups">Groups</h3>
		<div class = "contents-header-menu groups">
			<div class = "input-area groups">
				<div class = "img-btn search-icon"></div>
				<input type = "text" id = "groupsSearchInput" class = "search-input groups" placeholder = "그룹검색"/>
			</div>
			<div id = "groupsAddBtn" class = "add-btn"><p>+</p></div>
		</div>
	</div>
	<div class = "contents groups-body" id = "groupsBody">
		<?php echo $groups; ?>				
	</div>
	<div id = "popArrow" class = "pop-arrow"></div>	
</div>
<div class = "contents-div contacts">
	<div class = "contents header">
		<h3 class = "contents-header-title contacts">Contacts</h3>
		<div class = "contents-header-menu contacts">
			<div class = "input-area contacts">
				<div class = "img-btn search-icon"></div>
				<select id = "contactsSearchKey" class = "contacts-select-input">
					<option value = "name">이름</option>
					<option value = "phone">전화번호</option>
				</select>
				<input type = "text" id = "contactsSearchInput" class = "search-input contacts" placeholder = "연락처검색"/>
			</div>
			<div id = "contactsAddBtn" class = "add-btn"><p>+</p></div>	
		</div>
	</div>
	<div class = "contents contacts-body" id = "contactsBody">
		<?php echo $contacts; ?>
	</div>
</div>
<div id = "contactsDetailBody" class = "contents-div contacts-detail">
</div>