<?php
App::uses('AppController', 'Controller');
/**
 * Groups Controller
 *
 */
class GroupsController extends AppController {

/**
 * Scaffold
 *
 * @var mixed
 */


	function show($focus_id = null) {
		if ($this->params->requested || $this->request->is('ajax')) {
			$this->layout = NULL;
			$conditions = array();
			$searchInput = $this->request->query('searchInput');
			if ($searchInput) {
				$conditions = array('name' => '%' . $searchInput . '%');
			}
			$groups = $this->Group->find('all', array(
				'order' => 'Group.id DESC',
				'conditions' => $conditions,
				'contain' => array('Contact' => array(
					'fields' => 'Contact.id'
				))
			));
			foreach ($groups as $index => $group) {
				$groups[$index] = $group['Group'];
				$groups[$index]['Contacts'] = sizeof($group['Contact']);
			}
			$this->set('groups', $groups);
			if (isset($focus_id)) {
				$this->set('focus_id', $focus_id);
			} else {
				$this->set('focus_id', '');
			}	
		} else {
			$this->redirect('/');
		}
	}
	function add() {
		$this->layout = NULL;
		$this->request->onlyAllow('ajax');
		if ($this->Group->save($this->data)) {
			$this->redirect(array(
				'controller' => 'groups',
				'action' => 'show'
			));
		} else {
			$this->redirect('show');
		}
	}
	function delete() {
		$this->autoRender = false;
		$this->request->onlyAllow('ajax');
		$request_id = $this->request->data('id');
		if ($this->Group->delete($request_id)) {
			$this->redirect('show');
		} else {
			$this->redirect('show');
		}
	}
	function edit($id = null) {
		$this->autoRender = false;
		$this->request->onlyAllow('ajax');
		$this->Group->id = $id;
		if ($this->Group->save($this->data)) {
			$this->redirect(array('controller' => 'groups', 'action' => 'detail', $id));
		} else {
			$this->redirect('detail');
		}
	}
	function detail($id = null) {
		$this->layout = NULL;
		$group = $this->Group->findById($id);
		$this->set('new_group', false);	
		if ($group) {
			$this->set('group', $group);
		} else if ($this->request->data('isNew')) {
			$this->set('new_group', true);
		} else {
		}
	}
	function addContacts() {
		$groups_id = $this->params->data['groups_id'];
		$contacts_id = $this->params->data['contacts_id'];
		$this->Group->id = $groups_id;
		$data = array(
			'Group' => array('id' => $groups_id),
			'Contact' => $contacts_id
		);
		if ($this->Group->save($data)) {
			$this->redirect(array(
				'controller' => 'contacts', 
				'action' => 'show',
				'?' => array('groupsId' => $this->Group->id)
			));
		} else {
			$this->set('error', $data);
			$this->render('/Home/error');
		}
	}
	function search() {
		if ($this->params->requested) {
			$search_input = $this->params->params['search_input'];
			$groups = $this->params->params['groups'];
			$result = array();
			foreach ($groups as $group) {
				if (strpos($search_input, $group['Group']['name']) !== false) {
					array_push($result, $group);
				}
			}
			return $result;
		}
		else return null;
	}
}

?>