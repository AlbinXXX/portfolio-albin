import React from 'react';
import LiquidEther from '../components/effects/LiquidEther';

const LiquidEtherDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Liquid Ether Demo</h1>
        
        {/* Demo 1: Default Settings */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Default Settings</h2>
          <div className="w-full h-96 border rounded-lg overflow-hidden">
            <LiquidEther />
          </div>
        </div>
        
        {/* Demo 2: Custom Colors */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Custom Colors (Purple Theme)</h2>
          <div className="w-full h-96 border rounded-lg overflow-hidden">
            <LiquidEther 
              colors={['#8B5CF6', '#A78BFA', '#C4B5FD']}
              mouseForce={30}
              autoIntensity={3}
            />
          </div>
        </div>
        
        {/* Demo 3: High Viscosity */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">High Viscosity</h2>
          <div className="w-full h-96 border rounded-lg overflow-hidden">
            <LiquidEther 
              colors={['#EF4444', '#F87171', '#FCA5A5']}
              isViscous={true}
              viscous={50}
              mouseForce={15}
              resolution={0.75}
            />
          </div>
        </div>
        
        {/* Demo 4: No Auto Demo */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Manual Interaction Only</h2>
          <div className="w-full h-96 border rounded-lg overflow-hidden">
            <LiquidEther 
              colors={['#10B981', '#34D399', '#6EE7B7']}
              autoDemo={false}
              mouseForce={25}
              cursorSize={150}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidEtherDemo;