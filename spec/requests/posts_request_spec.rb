require 'rails_helper'

RSpec.describe "Posts", type: :request do
  describe "#index" do
    it 'fetches a list of all posts' do
      post1 = FactoryBot.create(:post)
      post2 = FactoryBot.create(:post, title: "Test Post")

      get "/posts"

      expect(response).to be_successful
      expect(response.body).to include(post1.title)
      expect(response.body).to include(post2.title)
    end
  end
end
