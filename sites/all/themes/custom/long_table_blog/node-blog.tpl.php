<?php /* dpm(get_defined_vars()); */?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $node_classes; ?>">
  <div class="node-inner">
    <div class="os-links">
      <?php print $vsite_admin_links; ?>
    </div>
    <?php if (!$page): ?>
      <h3 class="title">
        <a href="<?php print $node_url; ?>" title="<?php print $title ?>"><?php print $title; ?></a>
      </h3>
    <?php endif; ?>
    <?php if ($unpublished): ?>
      <div class="unpublished"><?php print t('Unpublished'); ?></div>
    <?php endif; ?>
     <?php if ($page): ?>
     	 
     	<div class="submitted-by">submitted by <strong><?php print $node->name ?></strong> <?php if ($submitted): ?>on <strong><?php print $submitted; ?></strong><?php endif; ?>
     <?php if ($terms): ?>
        <?php print t(' in ') . $terms; ?>
     <?php endif; ?>
     </div><br><br>
     <?php endif; ?>
    <div class="content">
      <?php print $content; ?>
	  </div>
    <?php if (!$page): ?>
    <?php
      $teaser_more = node_teaser($node->body,NULL,1600);
      if(strlen($teaser_more) > strlen($content)){
      	$class_extra = (strlen($teaser_more) == strlen($node->body))?" complete":"";
      	print '<div class="content-more'.$class_extra.'" style="display:none;">'.$teaser_more.'</div>';
      }
    ?>
    <div class="submitted-by">submitted by <strong><?php print $name ?></strong>  <?php if ($submitted): ?>on <strong><?php print $submitted; ?></strong><?php endif; ?> <?php if ($terms): ?> <?php print t(' in ') . $terms; ?>  <?php endif; ?></div>
    <?php endif; ?>
    <?php if ($links): ?>
      <div class="links links-inline">
        <?php print $links;?>
      </div>
    <?php endif;?>
  </div> <!-- /node-inner -->
</div> <!-- /node -->


