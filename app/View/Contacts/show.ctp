<?php 
	if (!isset($focus_id)) {
		$focus_id = '';
	}
?>
<div class = "contents-row contacts" id = "newContacts">
	<?php 
		echo $this->Form->create('Contact', array('action' => 'add'));
		echo $this->Form->input('name', array(
			'class' => 'new-input name', 
			'placeholder' => '이름...', 
			'label' => false, 
			'div' => false
		));
		echo $this->Form->input('phone', array(
			'class' => 'new-input phone',
			'placeholder' => '전화번호...',
			'label' => false,
			'div' => false
		));
		echo $this->Form->input('email', array(
			'class' => 'new-input email',
			'placeholder' => 'email...',
			'label' => false,
			'div' => false
		));
		echo $this->Form->submit('', array('class' => 'img-btn submit-btn', 'id' => 'contactsSubmitBtn'));
		echo $this->Form->end();
	?>
</div>
<?php
	if ($contacts[0]['id'] == $focus_id) {
		$contact = $contacts[0];
?>
	<div class = "contents-row contacts" contacts-id = "<?php echo $contact['id']; ?>" id = "insertedContacts">
		<h4 class = "contacts-text name"><?php echo $contact['name']; ?></h4>
		<h4 class = "contacts-text phone"><?php echo $contact['phone']; ?></h4>
		<h4 class = "contacts-text email"><?php echo $contact['email']; ?></h4>
		<input type = "button" class = "img-btn delete-btn"/>
	</div>
<?php unset($contacts[0]); } ?>

<?php foreach ($contacts as $contact): ?>
	<div class = "contents-row contacts" contacts-id = "<?php echo $contact['id']; ?>">
		<h4 class = "contacts-text name"><?php echo $contact['name']; ?></h4>
		<h4 class = "contacts-text phone"><?php echo $contact['phone']; ?></h4>
		<h4 class = "contacts-text email"><?php echo $contact['email']; ?></h4>
		<input type = "button" class = "img-btn delete-btn"/>
	</div>
<?php endforeach ?>