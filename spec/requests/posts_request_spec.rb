require 'rails_helper'

RSpec.describe "Posts", type: :request do
  describe "#index" do
    it 'fetches a list of all posts' do
      post1 = FactoryBot.create(:post)
      post2 = FactoryBot.create(:post, title: "Test Post")

      get posts_path

      expect(response).to be_successful
      expect(response.body).to include(post1.title)
      expect(response.body).to include(post2.title)
    end
  end

  describe "#show" do
    it "fetches a single post" do
      post = FactoryBot.create(:post)
      
      get post_path(post.id)
      
      expect(response).to be_successful
      expect(response.body).to include(post.title)
      expect(response.body).to include(post.body)
    end
  end
end
