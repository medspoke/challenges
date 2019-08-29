# frozen_string_literal: true
describe Mutations::Image::Create, type: :graphql do
  let(:context) { create_context }

  describe '#call' do
    subject(:mutation) { described_class.new(object: nil, context: context) }

    it { is_expected.to be_of_type(Types::ImageType) }
    it { is_expected.to accept_arguments(data: Types::Input::ImageInputType.to_non_null_type) }

    context 'when all required params exist' do
      let(:args) do
        {
          data: {
            height: 600,
            width: 900,
            raw_url: 'https://pics.com/image/123'
          }
        }
      end

      it 'creates image with given data' do
        # pre-check
        expect(Image.count).to eq 0

        # when
        image = mutation.resolve(args)

        # then
        expect(Image.count).to eq 1
        expect(image.height).to eq 600
        expect(image.width).to eq 900
        expect(image.raw_url).to eq 'https://pics.com/image/123'
      end
    end

    context 'when one of required params is missing' do
      let(:args) do
        {
          data: {
            height: 600,
            width: 900
          }
        }
      end

      it 'does not create image' do
        # pre-check
        expect(Image.count).to eq 0

        # when
        mutation.resolve(args)

        # then
        expect(Image.count).to eq 0
      end
    end
  end
end
