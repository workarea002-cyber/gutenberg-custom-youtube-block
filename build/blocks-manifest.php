<?php
// This file is generated. Do not modify it manually.
return array(
	'lite-youtube' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/lite-youtube',
		'version' => '0.1.0',
		'title' => 'Lite Youtube',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'attributes' => array(
			'youtubeLink' => array(
				'type' => 'string',
				'default' => 'https://www.youtube.com/watch?v=MLpWrANjFbI'
			),
			'thumbnail' => array(
				'type' => 'string',
				'source' => 'attribute',
				'selector' => 'img',
				'attribute' => 'src',
				'default' => 'https://img.youtube.com/vi/MLpWrANjFbI/hqdefault.jpg'
			),
			'youtubeVideoID' => array(
				'type' => 'string',
				'default' => 'MLpWrANjFbI'
			),
			'customImage' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			),
			'isCustomImage' => array(
				'type' => 'boolean',
				'default' => false
			),
			'isClicked' => array(
				'type' => 'boolean',
				'default' => false
			),
			'style' => array(
				'type' => 'object',
				'dimensions' => array(
					'aspectRatio' => '16/9'
				)
			)
		),
		'supports' => array(
			'html' => false,
			'border' => array(
				'color' => true,
				'radius' => true,
				'width' => true,
				'style' => true
			),
			'dimensions' => array(
				'aspectRatio' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'width' => true,
				'style' => true
			),
			'shadow' => true
		),
		'textdomain' => 'lite-youtube',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'script' => 'file:./frontend.js'
	)
);
