require 'rails_helper'

RSpec.describe Post, type: :model do
  it "is valid with valid attributes" do
    post = create(:post)
    
    expect(post).to be_valid
  end
end
