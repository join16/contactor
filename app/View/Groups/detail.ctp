<?php
	if (isset($group)) {
?>
	<input type = "hidden" id = "groupsDetailId" value = "<?php echo $group['Group']['id']; ?>"/>
	<div class = "groups-detail-page text">
		<h4 class = "groups-detail-contents name"><?php echo $group['Group']['name']; ?></h4>
		<input type = "button" id = "groupsDetailEditBtn" class = "img-btn edit-btn"/>
		<p class = "groups-detail-contents memo"><?php echo $group['Group']['memo']; ?></p>
		<input type = "button" class = "btn btn-default pairs-btn" id = "pairsAddBtn" value = "연락처 추가"/>
		<input type = "button" class = "btn btn-default pairs-btn" id = "pairsSubmitBtn" value = "연락처 저장"/>	
	</div>	
	<div class = "groups-detail-page input">
		<form>
			<input type = "text" name = "name" class = "groups-detail-contents input name" value = "<?php echo $group['Group']['name']; ?>" placeholder = "이름..."/>
			<input type = "button" id = "groupsDetailSubmitBtn" class = "img-btn edit-btn"/>
			<textarea name = "memo" class = "groups-detail-contents input memo"><?php echo $group['Group']['memo']; ?></textarea>
		</form>
	</div>
<?php		
	} else if ($new_group) {
?>
	<div class = "groups-detail-page input">
		<input type = "text" class = "groups-detail-contents input name"/> 
		<input type = "button" id = "groupsDetailSubmitBtn" class = "img-btn edit-btn"/>
		<textarea class = "groups-detail-contents input memo"></textarea>
	</div>
<?php } else { ?>
<input type = "hidden" id = "groupsDetailId" value = "0"/>
<?php } ?>
