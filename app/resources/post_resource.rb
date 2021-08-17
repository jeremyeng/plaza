class PostResource < ApplicationResource
  attribute :title, :string
  attribute :body, :string
  attribute :views, :integer
  attribute :created_at, :datetime, writable: false
  attribute :updated_at, :datetime, writable: false
end
