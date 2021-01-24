require 'rails_helper'

RSpec.feature "Posts", type: :feature do
  scenario "User views all posts" do
    post = FactoryBot.create(:post)

    visit posts_path
  
    expect(page).to have_text post.title
    expect(page).to_not have_text post.body
  end

  scenario "User clicks on a post to view it individually" do
    post = FactoryBot.create(:post)

    visit posts_path

    click_link(post.title)

    expect(page).to have_text post.title
    expect(page).to have_text post.body
  end

  scenario "User creates a new post" do
    visit new_post_path

    fill_in :post_title, with: "Test Title"
    fill_in :post_body, with: "Test Body"
    click_button "Create Post"

    expect(page).to have_text("Test Title")
    expect(page).to have_text("Test Body")
  end
end
