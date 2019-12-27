# frozen_string_literal: true
describe Mutations::Image::Update, type: :graphql do
  let(:context) { create_context }
  let!(:image) { create :image, raw_url: 'https://images.com/image/456' }

  describe '#call' do
    subject(:mutation) { described_class.new(object: nil, context: context) }

    it { is_expected.to be_of_type(Types::ImageType) }
    it {
      is_expected.to accept_arguments(
        id: types.ID.to_non_null_type,
        data: Types::Input::ImageInputType.to_non_null_type
      )
    }

    context 'when all required params exist' do
      let(:args) do
        {
          id: image.id,
          data: {
            raw_url: 'https://pics.com/image/123'
          }
        }
      end

      it 'updates image with given url' do
        # pre-check
        expect(Image.all.first.raw_url).to eq image.raw_url

        # when
        mutation.resolve(args)

        # then
        expect(Image.all.first.raw_url).to eq 'https://pics.com/image/123'
      end
    end

    context 'when id is missing' do
      let(:args) do
        {
          data: {
            raw_url: 'https://pics.com/image/123'
          }
        }
      end

      it 'results in GraphQL error' do
        # when
        result = mutation.resolve(args)

        # then
        expect(result).to be_instance_of GraphQL::ExecutionError
      end

      it 'does not update image' do
        # pre-check
        expect(Image.first.raw_url).to eq image.raw_url

        # when
        mutation.resolve(args)

        # then
        expect(Image.first.raw_url).not_to eq 'https://pics.com/image/123'
      end
    end
  end
end
