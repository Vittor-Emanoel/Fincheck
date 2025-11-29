import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';
import { Logo } from './logo';

interface InviteEmailProps {
  inviterName: string;
  inviteLink: string;
}

export default function InviteEmail({
  inviterName,
  inviteLink,
}: InviteEmailProps) {
  const previewText = `${inviterName} convidou você para o Fincheck`;

  return (
    <Html>
      {/* @ts-ignore */}
      <Tailwind>
        <Head />
        <Preview>{previewText}</Preview>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-xl shadow-sm mx-auto p-10 max-w-[520px] border border-gray-200">
            
            {/* LOGO */}
            <div className="w-full flex justify-center mb-6">
              <Logo className="w-32 h-auto text-gray-900" />
            </div>

            {/* TÍTULO */}
            <Heading className="text-gray-900 text-[26px] font-semibold text-center leading-tight mb-3">
              Convite para compartilhar uma conta
            </Heading>

            <Text className="text-gray-700 text-[15px] leading-[24px] text-center mb-6">
              <strong>{inviterName}</strong> convidou você para compartilhar uma
              conta bancária no <strong>Fincheck</strong>.
            </Text>

            <Section className="text-center my-8">
              <Button
                className="bg-black hover:bg-gray-800 transition-colors rounded-lg text-white text-[14px] px-6 py-3 font-medium no-underline"
                href={inviteLink}
              >
                Aceitar convite
              </Button>
            </Section>

            <Hr className="my-6 border-gray-200" />

            <Text className="text-gray-600 text-[13px] leading-[22px]">
              Se o botão não funcionar, copie e cole este link no seu navegador:
            </Text>

            <Link
              href={inviteLink}
              className="text-blue-600 break-all text-[13px]"
            >
              {inviteLink}
            </Link>

            <Hr className="my-6 border-gray-200" />

            <Text className="text-gray-400 text-[12px] text-center">
              Você recebeu este e-mail porque foi convidado para o Fincheck.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
