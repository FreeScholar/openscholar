<?php

/**
 * @param $node
 * @param $base
 * @param $teaser
 * @return unknown_type
 */
function theme_scholar_publications_biblio_tabular($node, $base = 'biblio', $teaser = false) {

  if (module_exists('popups')){
     popups_add_popups();
  }
  $tid = $node->biblio_type;
  $style_name = biblio_get_style();
  module_load_include('inc','biblio',"biblio_style_$style_name");
  
  $style_name = biblio_get_style();
  $style_function = "biblio_style_$style_name"."_author_options";
  module_load_include('inc','biblio',"biblio_style_$style_name");
  $fields = _biblio_get_field_information($node->biblio_type, TRUE);
  _biblio_localize_fields($fields);

  if ($node->biblio_url) {
    $attrib = (variable_get('biblio_links_target_new_window', null)) ? array('target' => '_blank') : array();
    $node->biblio_url = l($node->biblio_url, $node->biblio_url, $attrib);
  }
  if ($node->biblio_doi) {
    $doi_url = '';
    $attrib = (variable_get('biblio_links_target_new_window', null)) ? array('target' => '_blank') : array();
    if ( ($doi_start = strpos($node->biblio_doi, '10.')) !== FALSE) {
      $doi = substr($node->biblio_doi, $doi_start);
      $doi_url .= 'http://dx.doi.org/'. $doi;
    }
    $node->biblio_doi = l($node->biblio_doi, $doi_url, $attrib);
  }

  $author_text = "";
  foreach ($fields as $key => $row) {
    
    if ($row['type'] == 'contrib_widget' && !empty($node->biblio_contributors[$row['fid']][0]['name']) ) {
      $author_options = $style_function();
      $author_options['numberOfAuthorsTriggeringEtAl'] = 100; //set really high so we see all authors
      $data = theme('biblio_format_authors', $node->biblio_contributors[$row['fid']], $author_options, $inline);
      $author_text .= '<span class="biblio-authors">' . $data . "</span>.&nbsp; \n";
      continue;
    }
    else if (empty ($node->$row['name']) || $row['name'] == 'biblio_coins' || $row['name'] == 'biblio_lang' || $row['name'] == 'biblio_year' ) continue;
    else {
      switch ($row['name']) {
        case 'biblio_keywords' :
         $data = _biblio_keyword_links($node->$row['name'], $base);
          break;
        case 'biblio_url' :
        case 'biblio_doi' :
          // check_plain is not need on these since they have gone through
          // the l() function which does a check_plain
          $data = $node-> $row['name'];
          break;
        default :
          if ($row['type'] == 'textarea') {
            $data = check_markup($node-> $row['name'], $node->format, FALSE);
          }
          else {
            $data = check_plain($node-> $row['name']);
          }
      }
    }
    $rows[] = array(
      array(
        'data' => t($row['title']),
        'class' => 'biblio-row-title biblio-field-title-'.str_replace('_', '-', str_replace('biblio_', '', $row['name']))
      ),
      array(
        'data' => $data,
        'class' => 'biblio-field-contents-'.str_replace('_', '-', str_replace('biblio_', '', $row['name']))
      )
    );
  }

  if (isset ($node->biblio_year)) {
    $author_text .= check_plain($node->biblio_year) . ".&nbsp;&nbsp;";
  }

  if (strlen(trim($node->body)) && user_access('view full text')) {
    $rows[] = array(
        array('data' => t('Full Text'),  'valign' => 'top'),
        array('data' =>  check_markup($node->body, $node->format, FALSE))
    );
  }
  $output = '<div id="biblio-node">';
   if (count($node->field_biblio_image[0])) {
    $output .= '<div class="flL">' . theme('imagecache','book_cover', $node->field_biblio_image[0]['filepath']) . '</div>';
   }
  $output .= filter_xss($node->biblio_coins, array('span'));
  $output .= $author_text;
  if (count($rows)){
    foreach ($rows as $row){
      $output .= "<h3>".$row[0]['data'].":</h3>".$row[1]['data'];
    }
  }
  $output .= '</div>';
  return $output;
}