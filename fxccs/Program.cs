
using System;
using SharpDX;
using SharpDX.D3DCompiler;

var inputPath = args[0];
var shaderFunction = args[1];
var shaderProfile = args[2];
var shaderFlags = (ShaderFlags)int.Parse(args[3]);
var displayPath = args[4];
var destinationPath = args[5];

var result = ShaderBytecode.Compile(File.ReadAllText(inputPath), shaderFunction, shaderProfile, shaderFlags, 0, null, null, displayPath);
if (!string.IsNullOrEmpty(result.Message))
{
    Console.WriteLine(result.Message);
}
if (result.ResultCode == Result.Ok)
{
    File.WriteAllBytes(destinationPath, result.Bytecode.Data);
}
return (int)result.ResultCode;
