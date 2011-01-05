<?php

/**
 * Implementation of hook_user_default_permissions().
 */
function scholar_presentations_user_default_permissions() {
  $permissions = array();

  // Exported permission: create presentation content
  $permissions['create presentation content'] = array(
    'name' => 'create presentation content',
    'roles' => array(
      '0' => 'scholar admin',
      '1' => 'scholar user',
    ),
  );

  // Exported permission: delete own presentation content
  $permissions['delete own presentation content'] = array(
    'name' => 'delete own presentation content',
    'roles' => array(
      '0' => 'scholar admin',
      '1' => 'scholar user',
    ),
  );

  // Exported permission: edit own presentation content
  $permissions['edit own presentation content'] = array(
    'name' => 'edit own presentation content',
    'roles' => array(
      '0' => 'scholar admin',
      '1' => 'scholar user',
    ),
  );

  // Exported permission: override presentation promote to front page option
  $permissions['override presentation promote to front page option'] = array(
    'name' => 'override presentation promote to front page option',
    'roles' => array(
      '0' => 'scholar admin',
      '1' => 'scholar user',
    ),
  );

  // Exported permission: override presentation published option
  $permissions['override presentation published option'] = array(
    'name' => 'override presentation published option',
    'roles' => array(
      '0' => 'scholar admin',
      '1' => 'scholar user',
    ),
  );

  // Exported permission: override presentation revision option
  $permissions['override presentation revision option'] = array(
    'name' => 'override presentation revision option',
    'roles' => array(
      '0' => 'scholar admin',
      '1' => 'scholar user',
    ),
  );

  // Exported permission: override presentation sticky option
  $permissions['override presentation sticky option'] = array(
    'name' => 'override presentation sticky option',
    'roles' => array(
      '0' => 'scholar admin',
      '1' => 'scholar user',
    ),
  );

  return $permissions;
}