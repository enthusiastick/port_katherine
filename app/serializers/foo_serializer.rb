class FooSerializer
  include FastJsonapi::ObjectSerializer
  set_type :booking
  attributes :category, :checked_in_at
end
