<input type = "hidden" id = "contactsDetailId" value = "<?php echo $contact['id']; ?>"/>
<div class = "contents header contacts-detail"></div>
<div class = "contacts-detail-contents" id = "contactsDetailContents">
	<form id = "contactsDetailForm">
		<div class = "contacts-detail-row name">
			<img src = "" class = "contacts-detail-profile"/>
			<div class = "contacts-detail-text-area">
				<p class = "contacts-detail-label">이름 </p>
				<h4 class = "contacts-detail-text name"><?php echo $contact['name']; ?></h4>
				<input type = "text" name = "name" class = "contacts-detail-text name" 
				value = "<?php echo $contact['name']; ?>"/>
			</div>
		</div>
		<div class = "contacts-detail-row">
			<div class = "contacts-detail-text-area">
				<p class = "contacts-detail-label">전화번호</p>
				<h4 class = "contacts-detail-text"><?php echo $contact['phone']; ?></h4>
				<input type = "text" name = "phone" class = "contacts-detail-text phone" 
				value = "<?php echo $contact['phone']; ?>"/>
			</div>
		</div>
		<div class = "contacts-detail-row">
			<div class = "contacts-detail-text-area">
				<p class = "contacts-detail-label">이메일</p>
				<h4 class = "contacts-detail-text"><?php echo $contact['email']; ?></h4>
				<input type = "text" name = "email" class = "contacts-detail-text email" 
				value = "<?php echo $contact['email']; ?>"/>
			</div>
		</div>
		<div class = "contacts-detail-row">
			<div class = "contacts-detail-text-area">
				<p class = "contacts-detail-label">나이</p>
				<h4 class = "contacts-detail-text"><?php echo $contact['age']; ?></h4>
				<input type = "text" name = "age" class = "contacts-detail-text age" 
				value = "<?php echo $contact['age']; ?>"/>
			</div>
		</div>
		<div class = "contacts-detail-row memo">
			<p class = "contacts-detail-label">메모</p>
			<p class = "contacts-detail-text memo"><?php echo $contact['memo']; ?></p>
			<textarea class = "contacts-detail-text memo" name = "memo"><?php echo $contact['memo']; ?></textarea>
		</div>
		<div class = "contacts-detail-menu">
			<input type = "button" id = "contactsEditBtn" class = "btn btn-default" value = "연락처 수정"/>
			<input type = "button" id = "contactsSubmitBtn" class = "btn btn-default" value = "연락처 저장"/>
		</div>
	</form>
</div>