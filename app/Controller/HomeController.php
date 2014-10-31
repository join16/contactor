<?php
App::uses('AppController', 'Controller');
/**
 * Homes Controller
 *
 */
class HomeController extends AppController {

/**
 * Scaffold
 *
 * @var mixed
 */
	public function beforeFilter() {
		if (isset($_SESSION['user_id'])) {
			$this->redirect('/members/');
		}
	}
	function index() {
		$this->layout = 'default';
		$this->set('contacts', $this->requestAction('/contacts/show', array('return')));
		$this->set('groups', $this->requestAction('/groups/show', array('return')));
		$this->set('group_detail', $this->requestAction('/groups/detail', array('return')));
	}
	function home() {
	}
	function error() {}
}
