<?php

/*
 Plugin Name: BWFade
 Plugin URI: http://ismaelgaudioso.es
 Description: B&W image fade to color
 Version: 1.0
 Author: Ismael Gaudioso Anguas
 Author URI: http://ismaelgaudioso.es
 */

/*  Copyright 2012  Ismael Gaudioso Anguas  (email : yo@ismaelgaudioso.es)

 This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License, version 2, as
 published by the Free Software Foundation.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

if (preg_match('#' . basename(__FILE__) . '#', $_SERVER['PHP_SELF'])) { die('You are not allowed to call this page directly.');
}

if (!class_exists('BWFade')) {
	class BWFade {

		function BWFade() {
			//add_action( 'plugins_loaded', array(&$this, 'start_plugin') );
			$this -> start_plugin();

		}

		function start_plugin() {

			$this -> add_BWScripts();


		}


		function add_BWScripts() {

			$folder = basename(dirname(__FILE__));

			$URL = trailingslashit(plugins_url($folder));
			wp_register_script('BWFade', $URL . 'BWFade.js', array('jquery'), '1.0');
			wp_register_script('BlackAndWhite', $URL . 'jQuery.BlackAndWhite.js', array('jquery'), '1.0');
			wp_enqueue_script('BWFade');
			wp_enqueue_script('BlackAndWhite');
		}

	

	}

	global $bw;
	$bw = new BWFade();
}
