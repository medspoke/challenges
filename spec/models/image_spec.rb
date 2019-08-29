# frozen_string_literal: true
describe Image, type: :model do
  describe 'Relations' do
    it { is_expected.to belong_to(:author) }
  end

  describe 'Validations' do
    it { is_expected.to validate_presence_of :height }
    it { is_expected.to validate_presence_of :width }
    it { is_expected.to validate_presence_of :raw_url }
  end
end
