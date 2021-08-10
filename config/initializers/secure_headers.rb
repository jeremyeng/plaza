SecureHeaders::Configuration.default do |config|
  config.csp.script_src_elem = %w('self')

  if Rails.env.development?
    config.csp.connect_src = %w('self' https http://localhost:3035 ws://localhost:3035)
    
  end
end