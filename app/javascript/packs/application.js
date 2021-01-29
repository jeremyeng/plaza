// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import "@hotwired/turbo-rails"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
ActiveStorage.start()

import "controllers"
import "stylesheets/application"

document.addEventListener("DOMContentLoaded", function(){
  document.documentElement.addEventListener("turbo:click", function(event){
    if(/\/posts\/\d+/.test(event.detail.url)) {
      history.pushState(history.state, '', event.detail.url);
    }
  });

  document.documentElement.addEventListener("turbo:submit-end", function(event){
    if(event.detail.fetchResponse.response.redirected) {
      history.pushState(history.state, '', event.detail.fetchResponse.response.url);
    }
  });
});

require("trix")
require("@rails/actiontext")