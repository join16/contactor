<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.View.Layouts
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */


?>
<!DOCTYPE html>
<html>
<head>
	<?php echo $this->Html->charset(); ?>
	<title>Contactor_</title>
	<?php
		echo $this->Html->css('bootstrap.min');
		echo $this->Html->script('plugins/jquery-2.1.1.min');
		echo $this->Html->script('plugins/ajaxFunctions');
		echo $this->Html->script('plugins/jqueryColor');
		echo $this->Html->script('plugins/yellowFade');
		echo $this->Html->css('frame.css');
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
		echo $this->Html->css('uiClass.css');
	?>
</head>
<body>
	<div class = "doc-header">
		<h1 class = "doc-title">the <span>Contactor_</span></h1>
	</div>
	<div class = "doc-center" id = "body">
		<?php echo $this->fetch('content'); ?>
	</div>
	<div class = "doc-footer">
		<div class = "footer-content"></div>
	</div>
	<div id = "ajaxModal" class = "ajax-modal hidden">
		<div class = "color-div"></div>
		<div class = "wait-content">
			<img class = "wait-image" src = "/contactor/img/icons/waiting.gif"/>
			<h4 class = "wait-text">loading...</h4>			
		</div>
	</div>
</body>
</html>
