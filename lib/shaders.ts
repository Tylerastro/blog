import fs from 'fs';
import path from 'path';

export interface ShaderMetadata {
  title: string;
  description: string;
  showControls?: boolean;
  showPerformance?: boolean;
  uniforms?: Record<string, {
    default: number;
    min?: number;
    max?: number;
    step?: number;
  }>;
}

export interface ShaderData {
  slug: string;
  vertexShader: string;
  fragmentShader: string;
  metadata?: ShaderMetadata;
}

const SHADER_DIR = path.join(process.cwd(), '@shader');

/**
 * Get all available shader slugs
 */
export function getShaderSlugs(): string[] {
  try {
    return fs.readdirSync(SHADER_DIR).filter(item => {
      const itemPath = path.join(SHADER_DIR, item);
      return fs.statSync(itemPath).isDirectory();
    });
  } catch (error) {
    console.error('Error reading shader directory:', error);
    return [];
  }
}

/**
 * Load shader data by slug
 */
export function getShaderData(slug: string): ShaderData | null {
  try {
    const shaderPath = path.join(SHADER_DIR, slug);

    // Check if directory exists
    if (!fs.existsSync(shaderPath)) {
      return null;
    }

    const vertexPath = path.join(shaderPath, 'vertex.glsl');
    const fragmentPath = path.join(shaderPath, 'fragment.glsl');
    const metadataPath = path.join(shaderPath, 'metadata.json');

    // Check if required shader files exist
    if (!fs.existsSync(vertexPath) || !fs.existsSync(fragmentPath)) {
      return null;
    }

    const vertexShader = fs.readFileSync(vertexPath, 'utf-8');
    const fragmentShader = fs.readFileSync(fragmentPath, 'utf-8');

    let metadata: ShaderMetadata | undefined;
    if (fs.existsSync(metadataPath)) {
      try {
        metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
      } catch (error) {
        console.error(`Error parsing metadata for shader ${slug}:`, error);
      }
    }

    return {
      slug,
      vertexShader,
      fragmentShader,
      metadata,
    };
  } catch (error) {
    console.error(`Error loading shader ${slug}:`, error);
    return null;
  }
}

/**
 * Get all shader data for listing
 */
export function getAllShaderData(): ShaderData[] {
  const slugs = getShaderSlugs();
  return slugs
    .map(getShaderData)
    .filter((shader): shader is ShaderData => shader !== null);
}