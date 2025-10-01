import { notFound } from 'next/navigation';
import { getShaderData, getShaderSlugs } from '@/lib/shaders';
import ShaderViewer from '@/components/ShaderViewer';
import { ShaderPageProps } from '@/types/pages';

export default async function ShaderPage({ params }: ShaderPageProps) {
  const { slug } = await params;
  const shaderData = getShaderData(slug);

  if (!shaderData) {
    notFound();
  }

  return (
    <ShaderViewer
      vertexShader={shaderData.vertexShader}
      fragmentShader={shaderData.fragmentShader}
      metadata={shaderData.metadata}
    />
  );
}

// Generate static params for all available shaders
export function generateStaticParams() {
  const slugs = getShaderSlugs();

  // Generate for both language paths
  const params = [];
  for (const slug of slugs) {
    params.push({ slug, lang: 'en-US' });
    params.push({ slug, lang: 'zh-TW' });
  }

  return params;
}

// Generate metadata for each shader
export async function generateMetadata({ params }: ShaderPageProps) {
  const { slug } = await params;
  const shaderData = getShaderData(slug);

  if (!shaderData) {
    return {
      title: 'Shader Not Found',
    };
  }

  return {
    title: shaderData.metadata?.title || `Shader: ${slug}`,
    description: shaderData.metadata?.description || `Interactive shader demonstration: ${slug}`,
  };
}