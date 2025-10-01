import Link from "next/link";
import { getAllShaderData } from "@/lib/shaders";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShaderGalleryProps } from "@/types/pages";

export default async function ShadersPage({ params }: ShaderGalleryProps) {
  const { lang } = await params;
  const shaders = getAllShaderData();

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Shader Gallery</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive GLSL shader demonstrations and examples
          </p>
        </header>

        {shaders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No shaders available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shaders.map((shader) => (
              <Link
                key={shader.slug}
                href={`/${lang}/posts/shader/${shader.slug}`}
                className="block group"
              >
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group-hover:border-blue-500">
                  <CardHeader>
                    <CardTitle className="group-hover:text-blue-600 transition-colors">
                      {shader.metadata?.title || shader.slug}
                    </CardTitle>
                    {shader.metadata?.description && (
                      <CardDescription>
                        {shader.metadata.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {shader.metadata?.showControls && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                          Interactive
                        </span>
                      )}
                      {shader.metadata?.showPerformance && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                          Performance
                        </span>
                      )}
                      {!shader.metadata && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs rounded">
                          Simple
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-gray-500">
                      Click to view shader
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "Shader Gallery",
    description: "Interactive GLSL shader demonstrations and examples",
  };
}
