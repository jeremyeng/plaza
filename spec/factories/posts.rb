FactoryBot.define do
  
  factory :post do
    sequence(:title) { |n| "Post #{n}" }
    sequence(:body) { |n| "Body Text #{n}" }
  end
end