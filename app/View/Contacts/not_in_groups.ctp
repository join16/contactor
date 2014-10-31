<div class = "contents-pairs-page">
<?php foreach ($contacts as $contact): ?>
	<div class = "contents-row contacts" contacts-id = "<?php echo $contact['id']; ?>">
		<input type = "button" class = "img-btn contacts-pairs-btn"/>
		<h4 class = "contacts-text name"><?php echo $contact['name']; ?></h4>
		<h4 class = "contacts-text phone"><?php echo $contact['phone']; ?></h4>
		<h4 class = "contacts-text email"><?php echo $contact['email']; ?></h4>
	</div>
<?php endforeach ?>
</div>