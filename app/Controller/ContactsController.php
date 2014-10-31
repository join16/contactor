<?php
	class ContactsController extends AppController {

		public $components = array('Paginator');
		public $paginate = array('limit' => 2, 'maxLimit' => 1);

		
//--------------------- public methods ------------------------

		function show() {
			$this->layout = null;
			$render = 'show';
			$contacts = array();
			$conditions = array();
			if ($this->request->query('searchKey')) {
				$searchKey = 'Contact.' . $this->request->query('searchKey') . ' LIKE';
				$searchInput = '%' . $this->request->query('searchInput') . '%';
				$conditions = array($searchKey => $searchInput);
				$this->search();
			}
			$this->params->data['conditions'] = $conditions;			
			if ($this->request->query('groupsId')) {  // inGroups Request
				$contacts = $this->inGroups($this->request->query('groupsId'));
			} else if ($this->request->query('notGroupsId')) { // notInGroups Request
				$contacts = $this->notInGroups($this->request->query('notGroupsId'));
				$render = 'notInGroups';
			} else { // show all
				$contacts = $this->all();
			}
			if ($this->request->query('focus_id')) {
				$this->set('focus_id', $this->request->query('focus_id'));
			}
			$this->set('contacts', $contacts);
			if ($render == 'notInGroups') {
				$this->render('notInGroups');
			} else if (sizeof($contacts) == 0) {
				$this->render('empty');
			}
		}
		function add() {
			$this->layout = NULL;
			$this->request->onlyAllow('ajax');
			if ($this->Contact->save($this->data)) {
				$this->redirect(array(
					'controller' => 'contacts',
					'action' => 'show',
					'?' => array('focus_id' => $this->Contact->id)
				));				
			} else {
				$this->set('error', $this->data);
				$this->render('/Home/error');
			}
		}
		function delete($id = null) {
			$this->autoRender = false;
			$this->request->onlyAllow('ajax');
			$request_id = $this->request->data('id');
			if ($this->Contact->delete($request_id)) {
				$this->redirect('show');
			} else {
				$this->redirect('show');
			}
		}
		function detail($contacts_id) {
			$this->layout = null;
			$contact = $this->Contact->find('first', array(
				'conditions' => array('Contact.id' => $contacts_id)
			));

			$this->set('contact', $contact['Contact']);
		}
		function edit($id = null) {
			$this->autoRender = false;
			$this->request->onlyAllow('ajax');
			$this->Contact->id = $id;
			if ($this->Contact->save($this->data)) {
				$this->redirect(array('controller' => 'contacts', 'action' => 'detail', $id));
			} else {
				$this->redirect('detail');
			}
		}		

// -------------- private methods ---------------------

		private function all() {
			$contacts = $this->Contact->find('all', array(
				'order' => 'Contact.id DESC', 
				'conditions' => $this->params->data('conditions')
			));
			$contacts = Set::extract('/Contact/.', $contacts);
			return $contacts;
		}
		private function inGroups($groups_id) {	
			$group = $this->Contact->Group->find('first', array(
				'conditions' => array('Group.id' => $groups_id),
				'contain' => array('Contact' => array(
					'conditions' => $this->params->data('conditions'),
					'order' => 'Contact.id DESC'
				))
			));
			return $group['Contact'];
		}
		private function notInGroups($groups_id) {
			$contacts= $this->Contact->find('all', array(
				'conditions' => $this->params->data('conditions'),
				'contain' => array('Group' => array(
					'fields' => 'Group.id',
					'conditions' => array('Group.id' => $groups_id)
				))
			));
			$results = array();
			foreach ($contacts as $contact) {
				if (sizeof($contact['Group']) == 0) {
					array_push($results, $contact['Contact']);
				}
			}
			return $results;
		}		
	}
?>