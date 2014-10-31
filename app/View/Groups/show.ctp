<div id = "allGroups" class = "contents-row groups selected" groups-id = "0">
	<h4 class = "groups-text name">전체보기</h4>
</div>
<div class = "contents-row groups" id = "newGroups">
	<?php 
		echo $this->Form->create('Group', array('action' => 'add'));
		echo $this->Form->input('name', array(
			'class' => 'new-input', 
			'placeholder' => '이름...', 
			'label' => false, 
			'div' => false
			)
		);
		echo $this->Form->submit('', array('class' => 'img-btn submit-btn', 'id' => 'groupsSubmitBtn'));
		echo $this->Form->end();
	?>
</div>
<?php 
	if ($groups[0]['id'] == $focus_id) {
		$group = $groups[0];
?>
	<div class = "contents-row groups" groups-id = "<?php echo $group['id']; ?>" id = "insertedGroups">
		<h4 class = "groups-text name"><?php echo $group['name']; ?></h4>
		<input type = "button" class = "img-btn delete-btn"/>
	</div>
<?php
	unset($groups[0]);
	}
?>
<?php foreach ($groups as $group): ?>
	<div class = "contents-row groups" groups-id = "<?php echo $group['id']; ?>">
		<h4 class = "groups-text name"><?php echo $group['name']; ?></h4>
		<input type = "button" class = "img-btn delete-btn"/>		
		<div class = "groups-number-area">
			<div class = "img-btn groups-number-icon"></div>
			<p class = "groups-number-text"><?php echo $group['Contacts']; ?></p>
		</div>
	</div>
<?php endforeach ?>
